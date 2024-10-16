import { ColorHelper, DesignTokenHelper } from '@kirbydesign/core';
import { Parameters } from '@storybook/angular';

export const defaultParameters: Parameters = {
  backgrounds: {
    default: 'gray',
    values: [
      {
        name: 'white',
        value: '#fff',
      },
      {
        name: 'gray',
        value: ColorHelper.getBackgroundColor(),
      },
      {
        name: 'dark',
        value: '#353535',
      },
    ],
  },
  viewport: {
    viewports: {
      small: {
        name: 'Small Viewport',
        styles: { width: DesignTokenHelper.breakpoints.xsmall, height: '100%' },
      },
      large: {
        name: 'Large Viewport',
        styles: { width: DesignTokenHelper.breakpoints.large, height: '100%' },
      },
    },
  },
};

export const responsiveModes = {
  mobile: {
    viewport: 'small',
  },
  desktop: {
    viewport: 'large',
  },
};
