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
    return DesignTokenHelper.sizeValue(styles.sizes[key]);
  }

  public static fontSize(key: string): string {
    return DesignTokenHelper.sizeValue(styles.fontSizes[key]);
  }

  public static fontWeight(key: string): string {
    return styles.fontWeight[key].value + '';
  }

  public static lineHeight(key: string): string {
    return DesignTokenHelper.sizeValue(styles.lineHeight[key]);
  }

  public static borderRadius(): string {
    return DesignTokenHelper.sizeValue(styles.borderRadius);
  }

  public static borderRadiusRound(): string {
    return DesignTokenHelper.sizeValue(styles.borderRadiusRound);
  }

  private static sizeValue(entry: { value: number; unit: string }): string {
    return entry.value + (entry.unit || '');
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
