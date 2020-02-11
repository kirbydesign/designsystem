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

  public static size(key: string): string {
    return DesignTokenHelper.designTokens.global['$sizes'][key] + 'px';
  }

  public static fontSize(key: string): string {
    return DesignTokenHelper.designTokens.global['$font-sizes'][key] + 'px';
  }

  public static fontWeight(key: string): string {
    return DesignTokenHelper.designTokens.global['$font-weight'][key] + '';
  }

  public static lineHeight(key: string): string {
    return DesignTokenHelper.designTokens.global['$line-height'][key] + 'px';
  }

  public static borderRadius(): string {
    return DesignTokenHelper.designTokens.global['$border-radius'] + 'px';
  }

  public static borderRadiusRound(): string {
    return DesignTokenHelper.designTokens.global['$border-radius-round'] + 'px';
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
