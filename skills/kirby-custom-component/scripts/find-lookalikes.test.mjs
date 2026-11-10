import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { after, describe, it } from 'node:test';
import { fileURLToPath } from 'node:url';

const SCRIPT = join(dirname(fileURLToPath(import.meta.url)), 'find-lookalikes.mjs');

const INSTALLED_KIRBY = {
  'node_modules/@kirbydesign/core/scss/themes/default-brand.css': `:root, .kirby-surface-base {
  --kirby-color-fill-base: #fff;
  --kirby-color-fill-brand-loud: #00e89a;
  --kirby-color-content-base: #1c1c1c;
  --kirby-color-content-brand-loud: #1c1c1c;
  --kirby-color-border-focus: #238cec;
}`,
  'node_modules/@kirbydesign/designsystem/fesm2022/kirbydesign-designsystem-card.mjs':
    'const styles = [":host { background: var(--kirby-card-main-background-color); color: var(--kirby-card-main-color); }"];',
};

const fixtures = [];
after(() => fixtures.forEach((fixture) => rmSync(fixture, { recursive: true, force: true })));

function scan(files, { installed = INSTALLED_KIRBY } = {}) {
  const root = mkdtempSync(join(tmpdir(), 'find-lookalikes-'));
  fixtures.push(root);
  for (const [path, content] of Object.entries({ ...installed, ...files })) {
    mkdirSync(dirname(join(root, path)), { recursive: true });
    writeFileSync(join(root, path), content);
  }
  const output = execFileSync('node', [SCRIPT, 'src', '--json', '--all-findings'], {
    cwd: root,
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'ignore'],
  });
  return JSON.parse(output);
}

const findingFor = (findings, match) => findings.find((finding) => finding.match === match);

describe('no-brainer suggestions', () => {
  it('suggests the fill token for a legacy color on a background property', () => {
    const findings = scan({ 'src/a.scss': '.a { background: var(--kirby-primary); }' });

    assert.equal(
      findingFor(findings, '--kirby-primary').suggestion,
      'var(--kirby-color-fill-brand-loud)'
    );
  });

  it('does not suggest a token for a legacy color whose role depends on context', () => {
    const findings = scan({ 'src/a.scss': '.a { color: var(--kirby-primary); }' });

    assert.equal(findingFor(findings, '--kirby-primary').suggestion, undefined);
  });

  it('suggests the content token for a legacy text color on a text color property', () => {
    const findings = scan({ 'src/a.scss': '.a { color: var(--kirby-text-color-black); }' });

    assert.equal(
      findingFor(findings, '--kirby-text-color-black').suggestion,
      'var(--kirby-color-content-base)'
    );
  });

  it('does not suggest a content token for a legacy text color on a border', () => {
    const findings = scan({
      'src/a.scss': '.a { border: 1px solid var(--kirby-text-color-black); }',
    });

    assert.equal(findingFor(findings, '--kirby-text-color-black').suggestion, undefined);
  });

  it('does not suggest a content token for a legacy contrast color on a background', () => {
    const findings = scan({
      'src/a.scss': '.a { background-color: var(--kirby-primary-contrast); }',
    });

    assert.equal(findingFor(findings, '--kirby-primary-contrast').suggestion, undefined);
  });

  it('does not suggest a fill token for a legacy input background on a text color', () => {
    const findings = scan({
      'src/a.scss': '.a { color: var(--kirby-inputs-background-color); }',
    });

    assert.equal(findingFor(findings, '--kirby-inputs-background-color').suggestion, undefined);
  });

  it('suggests the focus border token for the legacy focus ring color in a box-shadow', () => {
    const findings = scan({
      'src/a.scss': '.a { box-shadow: 0 0 0 2px var(--kirby-focus-ring-color); }',
    });

    assert.equal(
      findingFor(findings, '--kirby-focus-ring-color').suggestion,
      'var(--kirby-color-border-focus)'
    );
  });

  it('does not suggest the focus border token for the legacy focus ring color on a text color', () => {
    const findings = scan({ 'src/a.scss': '.a { color: var(--kirby-focus-ring-color); }' });

    assert.equal(findingFor(findings, '--kirby-focus-ring-color').suggestion, undefined);
  });

  it('does not suggest a token for a variable whose role cannot be told from its name', () => {
    const findings = scan({
      'src/a.scss': '.a { --promo-accent: var(--kirby-text-color-black); }',
    });

    assert.equal(findingFor(findings, '--kirby-text-color-black').suggestion, undefined);
  });
});

describe('component variable overrides', () => {
  it('reports a legacy value on a component variable as an override with a suggestion', () => {
    const findings = scan({
      'src/a.scss': '.a { --kirby-card-main-background-color: var(--kirby-primary); }',
    });

    const finding = findingFor(findings, '--kirby-primary');
    assert.equal(finding.category, 'override');
    assert.equal(finding.suggestion, 'var(--kirby-color-fill-brand-loud)');
  });

  it('reports a hardcoded color on a component variable as an override', () => {
    const findings = scan({
      'src/a.scss': '.a { --kirby-card-main-background-color: #ff00aa; }',
    });

    assert.equal(findingFor(findings, '#ff00aa')?.category, 'override');
  });

  it('does not report a semantic token on a component variable', () => {
    const findings = scan({
      'src/a.scss': '.a { --kirby-card-main-background-color: var(--kirby-color-fill-base); }',
    });

    assert.deepEqual(findings, []);
  });
});

describe('unknown variables', () => {
  it('reports a custom variable that uses the reserved kirby- prefix', () => {
    const findings = scan({ 'src/a.scss': '.a { --kirby-promo-fill: red; }' });

    assert.equal(findingFor(findings, '--kirby-promo-fill')?.category, 'unknown-variable');
  });

  it('does not report a semantic color token that the installed Kirby version defines', () => {
    const findings = scan({ 'src/a.scss': '.a { color: var(--kirby-color-content-base); }' });

    assert.deepEqual(findings, []);
  });
});
