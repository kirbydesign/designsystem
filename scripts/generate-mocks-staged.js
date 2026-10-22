import { execFileSync } from 'child_process';

// Pre-commit: regenerates the testing mocks and stages them, so mocks are committed
// together with the library changes they reflect.

const triggerPaths = ['libs/designsystem/', 'libs/core/src/', 'tools/generate-mocks/'];
const generatedPaths = [
  'libs/designsystem/testing-base/',
  'libs/designsystem/testing-jasmine/',
  'libs/designsystem/testing-jest/',
];

const git = (...args) => execFileSync('git', args, { encoding: 'utf8' }).trim();
const run = (command, args) => execFileSync(command, args, { stdio: 'inherit' });

const stagedFiles = git('diff', '--cached', '--name-only', '--', ...triggerPaths);
if (!stagedFiles) process.exit(0);

console.log('[generate-mocks] Library changes staged, regenerating mocks...');

run('npx', ['tsc', '-b', 'tools/generate-mocks']);
run('node', ['./scripts/generate-mocks.js', '--force']);

const changed = git('status', '--porcelain', '--', ...generatedPaths);
if (changed) {
  git('add', '--', ...generatedPaths);
  console.log(`[generate-mocks] Staged regenerated mocks:\n${changed}`);
} else {
  console.log('[generate-mocks] Mocks are up to date.');
}
