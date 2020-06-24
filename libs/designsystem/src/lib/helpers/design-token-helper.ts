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

  public static size(key: string, valueOnly: boolean = false): string {
    const size = styles.sizes[key];
    return valueOnly ? size.split('px')[0] : size;
  }

  public static itemHeight(key: 'm' | 's' | 'xs' = 'm', valueOnly: boolean = false): string {
    const itemHeight = styles.itemHeights[key];
    return valueOnly ? itemHeight.split('px')[0] : itemHeight;
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

  public static backgroundColor(): string {
    return ColorHelper.getBackgroundColor();
  }

  public static borderRadius(): string {
    return styles.borderRadius;
  }

  public static borderRadiusRound(): string {
    return styles.borderRadiusRound;
  }

  public static alertMaxWidth(): string {
    return styles.alertMaxWidth;
  }

  public static compactModalMaxWidth(): string {
    return styles.compactModalMaxWidth;
  }

  public static dropdownItemHeight(): string {
    return styles.dropdownItemHeight;
  }

  public static avatarSize(key: 'xs' | 's' | 'm' | 'l'): string {
    return styles.avatarSizes[key];
  }
}

export type ThemeColorExtended =
  | ThemeColor
  | 'black'
  | 'semi-light'
  | 'semi-dark'
  | 'background-color';

export type ThemeColorVariant = 'tint' | 'shade' | 'contrast';

export interface ThemeColorDefinition {
  name: ThemeColorExtended;
  variant?: ThemeColorVariant;
  fullname: string;
  value?: string;
}
