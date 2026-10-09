import { namedPath } from './tokens.mjs';

export const FIGMA_SCOPES_EXTENSION = 'com.figma.scopes';
export const PERCENT = '%';

/** The unit `config.unit` assigns to a numeric token, or undefined to keep it unitless. */
export function unitFor(config, path, figmaScopes) {
  return config.unit(namedPath(path), figmaScopes ?? []);
}

export const dimensionTransform = {
  name: 'value/dimension',
  type: 'value',
  filter: (token) => token.$type === 'dimension' && typeof token.$value === 'object',
  transform: (token) => `${token.$value.value}${token.$value.unit}`,
};

export function percentageTransform(config) {
  const figmaScopesOf = (token) => token.original?.$extensions?.[FIGMA_SCOPES_EXTENSION];
  return {
    name: 'value/percentage',
    type: 'value',
    filter: (token) =>
      token.$type === 'number' && unitFor(config, token.path, figmaScopesOf(token)) === PERCENT,
    transform: (token) => `${token.$value}${PERCENT}`,
  };
}
