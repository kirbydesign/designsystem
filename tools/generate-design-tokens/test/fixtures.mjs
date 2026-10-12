import { validateConfig } from '../src/config.mjs';

/** A small Kirby-shaped config: ignored font sizes, two surfaces, and primitives. */
export const config = validateConfig({
  ignore: ['font-size/**'],
  variableName: ([group, ...rest]) =>
    group.endsWith(' surface') ? ['kirby', ...rest] : ['kirby', group, ...rest],
  outputs: {
    's.css': [
      {
        include: ['base surface/**'],
        selector: ':root, .kirby-surface-base',
        section: ([, category]) => category,
      },
      {
        include: ['raised surface/**'],
        selector: '.kirby-surface-raised',
        section: ([, category]) => category,
      },
    ],
    'p.css': [{ include: ['**'], section: ([group]) => group }],
  },
  units: { px: { scopes: ['GAP'], include: ['* surface/elevation/**'] } },
});

/** A config that sends every token to one file under `:root`. */
export function flatConfig(output, units) {
  return validateConfig({
    variableName: (path) => ['kirby', ...path],
    outputs: { [output]: [{ include: ['**'] }] },
    units,
  });
}
