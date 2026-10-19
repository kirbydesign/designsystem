import { test } from 'node:test';
import assert from 'node:assert/strict';

import { validateConfig } from '../src/config.mjs';
import { routeTokens } from '../src/routing.mjs';
import { config } from './fixtures.mjs';

const token = ($value) => ({ $type: 'color', $value });

test('routes Figma-path tokens without copying or changing them', () => {
  const source = { 'base surface': { color: { fill: { main: token('#fff') } } } };
  const { routes, emissions } = routeTokens(source, config);
  assert.equal(routes.get('base surface/color/fill/main').name, 'kirby-color-fill-main');
  assert.equal(routes.get('base surface/color/fill/main').emission, emissions[0].key);
  assert.equal(source['base surface'].color.fill.main.$value, '#fff');
  assert.equal(emissions[0].selector, ':root, .kirby-surface-base');
  assert.equal(emissions[0].section, 'color');
});

test('allows the same variable on different surface selectors', () => {
  const { emissions } = routeTokens(
    {
      'base surface': { color: { fill: { main: token('#fff') } } },
      'raised surface': { color: { fill: { main: token('#eee') } } },
    },
    config
  );
  assert.equal(emissions.length, 2);
});

test('rejects duplicate names on the same selector, including a selector list', () => {
  const overlapping = validateConfig({
    variableName: () => ['kirby', 'same'],
    outputs: {
      'a.css': [{ include: ['first/**'], selector: ':root, .base' }],
      'b.css': [{ include: ['second/**'] }],
    },
  });
  assert.throws(
    () => routeTokens({ first: { a: token('#fff') }, second: { b: token('#eee') } }, overlapping),
    /duplicate variable name --kirby-same under ":root"/
  );
});

test('baseline has names for aliases but no emissions', () => {
  const baseline = { system: { color: { green: { 500: token('#00ff00') } } } };
  const source = {
    'base surface': { color: { fill: { main: token('{system.color.green.500}') } } },
  };
  const { routes, emissions } = routeTokens(source, config, baseline);
  assert.equal(routes.get('system/color/green/500').name, 'kirby-system-color-green-500');
  assert.equal(routes.get('system/color/green/500').emission, null);
  assert.equal(emissions.length, 1);
});

test('source overrides included baseline paths', () => {
  const baseline = { spacing: { s: token('#fff') } };
  const { routes, emissions } = routeTokens({ spacing: { s: token('#eee') } }, config, baseline);
  assert.equal(routes.get('spacing/s').emission, emissions[0].key);
  assert.equal(emissions.length, 1);
});

test('rejects aliases between surfaces, because var() would resolve on the wrong surface', () => {
  const cases = [
    {
      name: 'raised aliasing base (base is also declared at :root)',
      source: {
        'base surface': { color: { fill: { main: token('#fff') } } },
        'raised surface': { color: { fill: { accent: token('{base surface.color.fill.main}') } } },
      },
      baseline: {},
      message:
        /"raised surface\/color\/fill\/accent" \(\.kirby-surface-raised\) aliases "base surface\/color\/fill\/main" \(:root, \.kirby-surface-base\)/,
    },
    {
      name: 'base aliasing raised',
      source: {
        'base surface': { color: { fill: { main: token('{raised surface.color.fill.main}') } } },
        'raised surface': { color: { fill: { main: token('#eee') } } },
      },
      baseline: {},
      message: /"base surface\/color\/fill\/main" .* aliases "raised surface\/color\/fill\/main"/,
    },
    {
      name: 'brand token aliasing a baseline surface token',
      source: {
        'raised surface': { color: { fill: { accent: token('{base surface.color.fill.main}') } } },
      },
      baseline: { 'base surface': { color: { fill: { main: token('#fff') } } } },
      message: /aliases "base surface\/color\/fill\/main"/,
    },
  ];
  for (const { name, source, baseline, message } of cases) {
    assert.throws(() => routeTokens(source, config, baseline), message, name);
  }
});

test('allows aliases to :root tokens and to tokens on the same surface', () => {
  const source = {
    spacing: { s: token('#000') },
    'raised surface': {
      color: {
        fill: {
          main: token('{spacing.s}'),
          accent: token('{raised surface.color.fill.main}'),
        },
      },
    },
  };
  assert.doesNotThrow(() => routeTokens(source, config));
});

test('fails when no output block includes a token', () => {
  const partial = validateConfig({
    variableName: (path) => path,
    outputs: { 'a.css': [{ include: ['spacing/**'] }] },
  });
  assert.throws(
    () => routeTokens({ orphan: token('#fff') }, partial),
    /No output includes "orphan"/
  );
});

test('rejects a variableName() that does not return name parts', () => {
  const broken = validateConfig({
    variableName: (path) => path.join('-'),
    outputs: { 'a.css': [{ include: ['**'] }] },
  });
  assert.throws(
    () => routeTokens({ x: token('#fff') }, broken),
    /variableName\(\) for "x" must return a non-empty array/
  );
});

test('slugs variable parts and joins them with dashes', () => {
  const { routes } = routeTokens({ 'Loudness Scale': { '01 Quiet': token('#fff') } }, config);
  assert.equal(routes.get('Loudness Scale/01 Quiet').name, 'kirby-loudness-scale-01-quiet');
});
