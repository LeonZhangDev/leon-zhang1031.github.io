import { readFileSync } from 'node:fs';
import { parseEnv } from 'node:util';

// Read one service-specific ignored file. Existing process settings take precedence.
// Loading credentials never authorizes network operations.
export function loadLocalEnvironment(env = process.env, file = new URL('./.env.local', import.meta.url)) {
  try {
    const values = parseEnv(readFileSync(file, 'utf8'));
    for (const [key, value] of Object.entries(values)) if (env[key] === undefined) env[key] = value;
  } catch (error) { if (error.code !== 'ENOENT') throw new Error('Cannot read local agent configuration.'); }
  return env;
}
