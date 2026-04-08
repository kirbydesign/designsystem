import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';

const ROOT = process.cwd();

const TARGET_DIRS = [
  'libs/angular',
  'libs/designsystem',
  'libs/extensions',
].map((p) => path.join(ROOT, p));

const SCSS_OR_CSS_OR_STORIES = (filePath) =>
  filePath.endsWith('.scss') || filePath.endsWith('.css') || filePath.endsWith('.stories.ts');

const FORBIDDEN_PATTERNS = [
  // Legacy descriptive SCSS helpers (new semantic system should be used instead)
  /\butils\.get-color\(\s*'(white|black|background-color|light|medium|semi-dark|semi-light|dark)\b/gi,
  /\butils\.get-text-color\(\s*'(white|black|semi-dark)\b/gi,

  // Legacy CSS custom properties that are not part of the semantic mode system
  /var\(\s*--kirby-(white|black|background-color|semi-dark|medium|dark-overlay|white-overlay)\b/gi,
];

async function* walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walk(fullPath);
      continue;
    }
    yield fullPath;
  }
}

function toRelative(filePath) {
  return path.relative(ROOT, filePath);
}

async function main() {
  /** @type {{file:string, matches:string[]}[]} */
  const violations = [];

  for (const dir of TARGET_DIRS) {
    const dirStat = await stat(dir).catch(() => null);
    if (!dirStat?.isDirectory()) continue;

    for await (const filePath of walk(dir)) {
      if (!SCSS_OR_CSS_OR_STORIES(filePath)) continue;

      const content = await readFile(filePath, 'utf8');
      const matches = [];

      for (const re of FORBIDDEN_PATTERNS) {
        const found = content.match(re);
        if (found?.length) {
          matches.push(...found.map((m) => m.trim()).slice(0, 5));
        }
      }

      if (matches.length) {
        violations.push({ file: toRelative(filePath), matches: [...new Set(matches)] });
      }
    }
  }

  if (!violations.length) {
    console.log('OK: No legacy descriptive colors detected in component libraries.');
    return;
  }

  console.error('ERROR: Legacy descriptive colors detected. Migrate to semantic tokens.\n');
  for (const v of violations) {
    console.error(`- ${v.file}`);
    for (const m of v.matches) console.error(`  - ${m}`);
  }
  process.exitCode = 1;
}

await main();
