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

export const shadowTransform = {
  name: 'value/shadow',
  type: 'value',
  filter: (token) => token.$type === 'shadow',
  transform: (token) => [token.$value].flat().map(shadowLayerToCss).join(', '),
};

function shadowLayerToCss({ offsetX, offsetY, blur, spread, color }) {
  return [offsetX, offsetY, blur, spread].map(lengthToCss).concat(colorToCss(color)).join(' ');
}

function lengthToCss(length) {
  if (typeof length !== 'object') return `${length}`;
  return length.value === 0 ? '0' : `${length.value}${length.unit}`;
}

function colorToCss(color) {
  if (typeof color !== 'object') return color;
  const [red, green, blue] = color.components.map((component) => Math.round(component * 255));
  return `rgba(${red}, ${green}, ${blue}, ${color.alpha ?? 1})`;
}
