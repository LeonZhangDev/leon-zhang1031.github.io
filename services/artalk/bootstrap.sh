#!/usr/bin/env bash
# First installation only. Run as root after uploading the verified release.
set -euo pipefail
test "$(id -u)" = 0
archive=/home/ubuntu/artalk-v2.10.0-linux-amd64.tar.gz
echo '8ef3dcb322207ea76038a32d8e137604eba9313259c3423683d80efbcf18aed1  '"$archive" | sha256sum -c -
test ! -e /etc/artalk/artalk.yml
test ! -e /var/lib/artalk/artalk.db
getent passwd artalk >/dev/null || useradd --system --home /var/lib/artalk --shell /usr/sbin/nologin artalk
install -d -m 750 -o root -g artalk /etc/artalk
install -d -m 750 -o artalk -g artalk /var/lib/artalk
install -d -m 700 /var/backups/artalk
install -m 755 /home/ubuntu/artalk_v2.10.0_linux_amd64/artalk /usr/local/bin/artalk
python3 - <<'PY'
import secrets
from pathlib import Path
config = '''host: 127.0.0.1
port: 23366
app_key: APP_KEY
debug: false
login_timeout: 259200
locale: zh-CN
timezone: Asia/Shanghai
site_default: 张坤个人主页
site_url: https://leonzk.cn
db:
  type: sqlite
  file: /var/lib/artalk/artalk.db
log:
  enabled: true
  filename: /var/lib/artalk/artalk.log
http:
  body_limit: 1
  proxy_header: X-Forwarded-For
trusted_domains:
  - https://leonzk.cn
  - https://www.leonzk.cn
  - https://comments.leonzk.cn
  - http://localhost:4321
moderator:
  pending_default: true
captcha:
  enabled: true
  captcha_type: image
  action_limit: 3
  action_reset: 60
img_upload:
  enabled: false
  path: /var/lib/artalk/images
email:
  enabled: false
  send_type: smtp
auth:
  enabled: false
frontend:
  emoticons: false
  imgUpload: false
  versionCheck: false
'''
Path('/etc/artalk/artalk.yml').write_text(config.replace('APP_KEY', secrets.token_hex(32)), encoding='utf-8')
PY
chown root:artalk /etc/artalk/artalk.yml
chmod 640 /etc/artalk/artalk.yml
cat >/etc/systemd/system/artalk.service <<'UNIT'
[Unit]
Description=Artalk comment service
After=network.target
[Service]
User=artalk
Group=artalk
WorkingDirectory=/var/lib/artalk
ExecStart=/usr/local/bin/artalk server --config /etc/artalk/artalk.yml
Restart=on-failure
RestartSec=5
UMask=0027
NoNewPrivileges=true
PrivateTmp=true
ProtectSystem=strict
ProtectHome=true
ReadWritePaths=/var/lib/artalk /etc/artalk
[Install]
WantedBy=multi-user.target
UNIT
cat >/usr/local/sbin/artalk-backup <<'BACKUP'
#!/bin/sh
set -eu
umask 077
target="/var/backups/artalk/artalk-$(date -u +%Y%m%dT%H%M%SZ).db"
sqlite3 /var/lib/artalk/artalk.db ".backup '$target'"
test "$(sqlite3 "$target" 'PRAGMA integrity_check;')" = ok
BACKUP
chmod 750 /usr/local/sbin/artalk-backup
cat >/etc/systemd/system/artalk-backup.service <<'UNIT'
[Unit]
Description=Consistent Artalk SQLite backup
[Service]
Type=oneshot
ExecStart=/usr/local/sbin/artalk-backup
UNIT
cat >/etc/systemd/system/artalk-backup.timer <<'UNIT'
[Unit]
Description=Daily Artalk backup
[Timer]
OnCalendar=*-*-* 03:15:00
RandomizedDelaySec=600
Persistent=true
[Install]
WantedBy=timers.target
UNIT
systemctl daemon-reload
systemctl enable --now artalk
systemctl enable --now artalk-backup.timer
sleep 2
systemctl is-active artalk
curl --fail --silent http://127.0.0.1:23366/api/v2/conf
echo
echo ARTALK_LOCAL_READY
