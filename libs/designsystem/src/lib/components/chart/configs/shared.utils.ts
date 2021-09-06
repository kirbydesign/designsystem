import { ScriptableContext } from 'chart.js';

import { ColorHelper } from '../../../helpers';
import { ChartDataset } from '../chart.types';

const { getThemeColorHexString } = ColorHelper;

export const hoverBackgroundColor = getThemeColorHexString('primary');
export const backgroundColor = getThemeColorHexString('secondary');

// Highlight elements that are added to the highlightedElements array
export function scriptedBackgroundColor(context: ScriptableContext<'bar'>) {
  const dataset = context.dataset as ChartDataset;
  const highlightedElements = dataset?.kirbyOptions?.highlightedElements;

  if (highlightedElements && highlightedElements.includes(context.dataIndex)) {
    return hoverBackgroundColor;
  } else {
    return backgroundColor;
  }
}

// Only adds a hovercolor if an onClick handler is provided
export function scriptedHoverBackgroundColor(context: ScriptableContext<'bar'>) {
  if (context.chart.options.onClick) {
    return hoverBackgroundColor;
  }
}
