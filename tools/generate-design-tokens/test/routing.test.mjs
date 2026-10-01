import { test } from 'node:test';
import assert from 'node:assert/strict';

import { validateConfig } from '../src/config.mjs';
import { routeTokens } from '../src/routing.mjs';

const config = validateConfig({
  prefix: 'kirby',
  rules: [
    {
      id: 'base',
      match: 'base surface/{category}/**',
      variable: '{prefix}-{category}-{rest}',
      selector: ':root, .{prefix}-surface-base',
      output: 'surfaces.css',
      section: '{category}',
    },
    {
      id: 'surface',
      match: '{surface} surface/{category}/**',
      variable: '{prefix}-{category}-{rest}',
      selector: '.{prefix}-surface-{surface}',
      output: 'surfaces.css',
      section: '{category}',
    },
    { id: 'primitive', match: '{category}/**', variable: '{prefix}-{path}', output: 'p.css' },
  ],
});

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
    prefix: 'kirby',
    rules: [
      {
        id: 'a',
        match: 'first/*',
        variable: '{prefix}-same',
        selector: ':root, .base',
        output: 'a.css',
      },
      { id: 'b', match: 'second/*', variable: '{prefix}-same', output: 'b.css' },
    ],
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

test('fails when a CSS rule does not match a token', () => {
  assert.throws(
    () => routeTokens({ orphan: token('#fff') }, config),
    /No rule matched leaf "orphan"/
  );
});
