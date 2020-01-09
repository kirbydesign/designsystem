import { ThemeColor } from './theme-color.type';
import { ColorHelper } from './color-helper';

declare var require: any;
export class DesignTokenHelper {
  static designTokens: any = require('sass-extract-loader?{"plugins": ["compact"]}!./design-token-helper.scss');

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

  public static size(key: string, includeUnit = true): number | string {
    const value = DesignTokenHelper.designTokens.global['$sizes'][key] as number;
    return includeUnit ? value + 'px' : value;
  }

  public static fontSize(key: string, includeUnit = true): number | string {
    const value = DesignTokenHelper.designTokens.global['$font-sizes'][key] as number;
    return includeUnit ? value + 'px' : value;
  }

  public static borderRadius(includeUnit = true): number | string {
    const value = DesignTokenHelper.designTokens.global['$border-radius'] as number;
    return includeUnit ? value + 'px' : value;
  }

  public static borderRadiusRound(includeUnit = true): number | string {
    const value = DesignTokenHelper.designTokens.global['$border-radius-round'] as number;
    return includeUnit ? value + 'px' : value;
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
