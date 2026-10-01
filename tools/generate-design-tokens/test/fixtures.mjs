import { validateConfig } from '../src/config.mjs';

export const config = validateConfig({
  prefix: 'kirby',
  units: { px: { scopes: ['GAP'], paths: ['* surface/elevation/**'] } },
  rules: [
    { id: 'skip', match: 'font-size/**', ignore: true },
    {
      id: 'base',
      match: 'base surface/{category}/**',
      variable: '{prefix}-{category}-{rest}',
      selector: ':root, .{prefix}-surface-base',
      output: 's.css',
      section: '{category}',
    },
    {
      id: 'surface',
      match: '{surface} surface/{category}/**',
      variable: '{prefix}-{category}-{rest}',
      selector: '.{prefix}-surface-{surface}',
      output: 's.css',
      section: '{category}',
    },
    {
      id: 'primitive',
      match: '{category}/**',
      variable: '{prefix}-{path}',
      output: 'p.css',
      section: '{category}',
    },
  ],
});
