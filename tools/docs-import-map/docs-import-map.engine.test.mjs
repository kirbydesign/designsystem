import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';
import { DocsImportMapEngine } from './dist/docs-import-map.engine.js';

test('maps exported declarations and named re-exports', () => {
  const root = mkdtempSync(join(tmpdir(), 'docs-import-map-'));

  try {
    const distPath = join(root, 'designsystem');
    mkdirSync(join(distPath, 'types'), { recursive: true });
    writeFileSync(
      join(distPath, 'package.json'),
      JSON.stringify({ exports: { './modal': { types: './types/modal.d.ts' } } })
    );
    writeFileSync(
      join(distPath, 'types/modal.d.ts'),
      'export declare class ModalController {}\nexport interface ActionSheetConfig {}\nexport type ModalFlavor = string;\nexport { InternalModal as PublicModal, type ModalOptions };\n'
    );

    const outputPath = join(root, 'designsystem.ts');
    new DocsImportMapEngine(distPath, outputPath).generate();

    const result = readFileSync(outputPath, 'utf8');
    for (const name of [
      'ModalController',
      'ActionSheetConfig',
      'ModalFlavor',
      'PublicModal',
      'ModalOptions',
    ]) {
      assert.match(result, new RegExp(`${name}: 'modal'`));
    }
    assert.doesNotMatch(result, /InternalModal: 'modal'/);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});
