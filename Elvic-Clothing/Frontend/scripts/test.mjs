import { readdirSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

// Explicit paths work in both Windows and POSIX shells without glob expansion.
const directory = new URL('../.test-build/tests/', import.meta.url);
const files = readdirSync(directory)
  .filter((name) => name.endsWith('.test.js'))
  .sort()
  .map((name) => fileURLToPath(new URL(name, directory)));

if (!files.length) throw new Error('No compiled regression tests were found.');
const result = spawnSync(process.execPath, ['--test', ...files], { stdio: 'inherit' });
if (result.error) throw result.error;
process.exitCode = result.status ?? 1;
