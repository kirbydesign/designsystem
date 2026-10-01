import { matchesAny } from './rules.mjs';

export const FIGMA_SCOPES_EXTENSION = 'com.figma.scopes';
const PERCENT = '%';

export function isPercent(unit) {
  return unit.suffix === PERCENT;
}

export function unitAppliesTo(unit, figmaScopes, path) {
  return (
    (figmaScopes ?? []).some((scope) => unit.scopes.has(scope)) || matchesAny(unit.paths, path)
  );
}

export const dimensionTransform = {
  name: 'value/dimension',
  type: 'value',
  filter: (token) => token.$type === 'dimension' && typeof token.$value === 'object',
  transform: (token) => `${token.$value.value}${token.$value.unit}`,
};

export function percentageTransform(units) {
  const percentUnits = units.filter(isPercent);
  const figmaScopesOf = (token) => token.original?.$extensions?.[FIGMA_SCOPES_EXTENSION];
  return {
    name: 'value/percentage',
    type: 'value',
    filter: (token) =>
      token.$type === 'number' &&
      percentUnits.some((unit) => unitAppliesTo(unit, figmaScopesOf(token), token.path)),
    transform: (token) => `${token.$value}${PERCENT}`,
  };
}
