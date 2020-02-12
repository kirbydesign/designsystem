import { ThemeColor } from './theme-color.type';
import { ColorHelper } from './color-helper';

import * as designTokens from './design-token-helper.scss.json';

export class DesignTokenHelper {
  public static getColor(
    name: ThemeColorExtended,
    variant?: ThemeColorVariant
  ): ThemeColorDefinition {
    const variantSuffix = variant ? `-${variant}` : '';
    const colorVariant = `${name}${variantSuffix}`;
    return {
      name: name,
      variant: variant,
      fullname: colorVariant,
      value: ColorHelper.getThemeColorRgbString(colorVariant),
    };
  }

  public static size(key: string): string {
    return designTokens.$sizes[key] + 'px';
  }

  public static fontSize(key: string): string {
    return designTokens['$font-sizes'][key] + 'px';
  }

  public static borderRadius(): string {
    return designTokens['$border-radius'] + 'px';
  }

  public static borderRadiusRound(): string {
    return designTokens['$border-radius-round'] + 'px';
  }
}

export type ThemeColorExtended = ThemeColor | 'black' | 'semi-light' | 'semi-dark';

export type ThemeColorVariant = 'tint' | 'shade' | 'contrast';

export interface ThemeColorDefinition {
  name: ThemeColorExtended;
  variant?: ThemeColorVariant;
  fullname: string;
  value?: string;
}
