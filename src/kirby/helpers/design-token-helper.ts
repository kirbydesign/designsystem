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
    return DesignTokenHelper.designTokens.global['$sizes'][key];
  }

  public static fontSize(key: string): string {
    return DesignTokenHelper.designTokens.global['$font-sizes'][key];
  }

  public static borderRadius(): string {
    return DesignTokenHelper.designTokens.global['$border-radius'];
  }

  public static borderRadiusRound(): string {
    return DesignTokenHelper.designTokens.global['$border-radius-round'];
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
