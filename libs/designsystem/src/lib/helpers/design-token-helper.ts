import { ThemeColor } from './theme-color.type';
import { ColorHelper } from './color-helper';

import { styles } from './design-token-helper.styles';

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
    return styles.sizes[key];
  }

  public static fontSize(key: string): string {
    return styles.fontSizes[key];
  }

  public static fontWeight(key: string): string {
    return styles.fontWeight[key];
  }

  public static lineHeight(key: string): string {
    return styles.lineHeight[key];
  }

  public static borderRadius(): string {
    return styles.borderRadius;
  }

  public static borderRadiusRound(): string {
    return styles.borderRadiusRound;
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
