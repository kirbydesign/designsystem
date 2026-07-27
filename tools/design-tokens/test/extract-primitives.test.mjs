/**
 * Tests for src/extract-primitives.mjs
 *
 * Run: node --test
 */

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  extractPrimitives,
  prefixReferences,
  slugCollection,
} from '../src/extract-primitives.mjs';

describe('slugCollection', () => {
  it('leaves kebab-case names untouched', () => {
    assert.equal(slugCollection('border-radius'), 'border-radius');
    assert.equal(slugCollection('spacing'), 'spacing');
  });

  it('slugs names with spaces and mixed case', () => {
    assert.equal(slugCollection('Component specs'), 'component-specs');
  });

  it('trims leading/trailing separators', () => {
    assert.equal(slugCollection('  Weird / Name  '), 'weird-name');
  });
});

describe('prefixReferences', () => {
  it('prefixes the leading collection segment of a reference', () => {
    assert.equal(prefixReferences('{spacing.xxxxs}', 'kirby'), '{kirby-spacing.xxxxs}');
  });

  it('preserves deep token paths after the collection', () => {
    assert.equal(
      prefixReferences('{border-radius.n.inner}', 'kirby'),
      '{kirby-border-radius.n.inner}',
    );
  });

  it('honors a custom prefix', () => {
    assert.equal(prefixReferences('{spacing.s}', 'acme'), '{acme-spacing.s}');
  });

  it('passes non-string values through untouched', () => {
    assert.equal(prefixReferences(16, 'kirby'), 16);
    assert.equal(prefixReferences('italic', 'kirby'), 'italic');
  });
});

describe('extractPrimitives', () => {
  it('extracts every collection present, prefixing collection keys', () => {
    const input = {
      spacing: {
        xxxxs: { $type: 'number', $value: 2, $extensions: { 'com.figma.variableId': 'x' } },
      },
      'font-weight': {
        bold: { $type: 'number', $value: 700, $extensions: {} },
      },
    };

    const result = extractPrimitives(input, 'kirby');

    assert.deepEqual(Object.keys(result).sort(), ['kirby-font-weight', 'kirby-spacing']);
    assert.equal(result['kirby-spacing'].xxxxs.$value, 2);
    assert.equal(result['kirby-font-weight'].bold.$value, 700);
  });

  it('preserves Figma $extensions (SD omits them from CSS; units read scopes from them)', () => {
    const input = {
      spacing: {
        s: {
          $type: 'number',
          $value: 16,
          $extensions: { 'com.figma.scopes': ['GAP'] },
        },
      },
    };

    const result = extractPrimitives(input, 'kirby');

    assert.deepEqual(result['kirby-spacing'].s.$extensions, { 'com.figma.scopes': ['GAP'] });
    assert.equal(result['kirby-spacing'].s.$value, 16);
  });

  it('rewrites references to carry the prefix', () => {
    const input = {
      'border-radius': {
        n: { $type: 'number', $value: '{spacing.s}', $extensions: {} },
      },
    };

    const result = extractPrimitives(input, 'kirby');

    assert.equal(result['kirby-border-radius'].n.$value, '{kirby-spacing.s}');
  });

  it('preserves nested groups (e.g. line-height.normal.xxs)', () => {
    const input = {
      'line-height': {
        normal: {
          xxs: { $type: 'number', $value: 14, $extensions: {} },
        },
      },
    };

    const result = extractPrimitives(input, 'kirby');

    assert.equal(result['kirby-line-height'].normal.xxs.$type, 'number');
    assert.equal(result['kirby-line-height'].normal.xxs.$value, 14);
  });

  it('slugs collection names into valid identifiers', () => {
    const input = {
      'Component specs': {
        'card-border-radius': { $type: 'number', $value: '{border-radius.n}', $extensions: {} },
      },
    };

    const result = extractPrimitives(input, 'kirby');

    assert.equal(
      result['kirby-component-specs']['card-border-radius'].$value,
      '{kirby-border-radius.n}',
    );
  });

  it('keeps string-typed tokens (e.g. font-weight normal-italic)', () => {
    const input = {
      'font-weight': {
        'normal-italic': { $type: 'string', $value: 'italic', $extensions: {} },
      },
    };

    const result = extractPrimitives(input, 'kirby');

    assert.equal(result['kirby-font-weight']['normal-italic'].$type, 'string');
    assert.equal(result['kirby-font-weight']['normal-italic'].$value, 'italic');
  });
});
