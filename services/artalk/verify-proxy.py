"""Exercise Caddy overload handling on loopback with a fake backend, never Artalk."""

import argparse
from concurrent.futures import ThreadPoolExecutor
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
import json
from pathlib import Path
import subprocess
from tempfile import TemporaryDirectory
import threading
import time
from urllib.error import HTTPError, URLError
from urllib.request import ProxyHandler, Request, build_opener


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("config", type=Path)
    args = parser.parse_args()
    source = args.config.read_text(encoding="utf-8")
    entered = threading.Condition()
    release = threading.Event()
    active = 0
    opener = build_opener(ProxyHandler({}))

    class Backend(BaseHTTPRequestHandler):
        def do_GET(self) -> None:
            nonlocal active
            if self.path == "/hold":
                with entered:
                    active += 1
                    entered.notify_all()
                release.wait(timeout=10)
            self.send_response(200)
            self.end_headers()
            self.wfile.write(b"ok")

        def do_POST(self) -> None:
            self.rfile.read(int(self.headers.get("Content-Length", "0")))
            self.send_response(200)
            self.end_headers()

        def log_message(self, *_args) -> None:
            pass

    def status(url: str, data: bytes | None = None) -> int:
        try:
            with opener.open(Request(url, data=data), timeout=15) as response:
                response.read()
                return response.status
        except HTTPError as error:
            error.read()
            return error.code

    backend = ThreadingHTTPServer(("127.0.0.1", 0), Backend)
    threading.Thread(target=backend.serve_forever, daemon=True).start()
    try:
        with TemporaryDirectory(prefix="artalk-proxy-qa-") as directory:
            config = Path(directory) / "Caddyfile"
            # Deliberately small cap proves the same overload rule with only 3 GETs.
            candidate = source.replace("{\n", "{\n    admin off\n", 1)
            candidate = candidate.replace("comments.leonzk.cn {", "http://127.0.0.1:24443 {")
            candidate = candidate.replace("127.0.0.1:23366", f"127.0.0.1:{backend.server_port}")
            candidate = candidate.replace("unhealthy_request_count 64", "unhealthy_request_count 2")
            config.write_text(candidate, encoding="utf-8")
            with (Path(directory) / "caddy.log").open("w", encoding="utf-8") as log:
                process = subprocess.Popen(["caddy", "run", "--config", str(config)], stdout=log, stderr=log)
                try:
                    base = "http://127.0.0.1:24443"
                    for _ in range(50):
                        if process.poll() is not None:
                            raise RuntimeError((Path(directory) / "caddy.log").read_text())
                        try:
                            if status(base + "/") == 200:
                                break
                        except URLError:
                            time.sleep(0.1)
                    else:
                        raise RuntimeError("Isolated Caddy readiness timeout: " + (Path(directory) / "caddy.log").read_text())
                    with ThreadPoolExecutor(max_workers=2) as pool:
                        held = [pool.submit(status, base + "/hold") for _ in range(2)]
                        try:
                            with entered:
                                assert entered.wait_for(lambda: active == 2, timeout=5), "Backend did not receive controls"
                            overload = status(base + "/")
                            assert overload == 503, f"Expected overload 503, got {overload}"
                        finally:
                            release.set()
                        assert [job.result() for job in held] == [200, 200]
                    assert status(base + "/") == 200, "Proxy did not recover after load drained"
                    assert status(base + "/", b"normal comment") == 200
                    oversize = status(base + "/", b"x" * (1024 * 1024 + 1))
                    # Caddy 2.6.2 wraps a streaming body-limit error as 502;
                    # newer versions can report 413. Both must reject the body.
                    assert oversize in (413, 502), f"Expected oversize rejection, got {oversize}"
                    assert status(base + "/") == 200, "Body rejection affected subsequent requests"
                    print(json.dumps({"scope": "isolated fake backend only", "normal": 200,
                                      "overload": overload, "recovered": 200, "oversize": oversize}))
                finally:
                    release.set()
                    process.terminate()
                    process.wait(timeout=10)
    finally:
        backend.shutdown()
        backend.server_close()


if __name__ == "__main__":
    main()
