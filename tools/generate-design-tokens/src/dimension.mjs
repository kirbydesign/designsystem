/** Render DTCG dimensions using their declared units. */
export const valueDimension = {
  name: 'value/dimension',
  type: 'value',
  filter: (token) => token.$type === 'dimension' && typeof token.$value === 'object',
  transform: (token) => `${token.$value.value}${token.$value.unit}`,
};

/** Opacity percentages are DTCG numbers; the CSS contract adds the unit. */
export const valuePercentage = {
  name: 'value/percentage',
  type: 'value',
  transform: (token) => `${token.$value}%`,
};
