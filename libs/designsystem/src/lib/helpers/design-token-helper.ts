import { ThemeColor } from './theme-color.type';
import { ColorHelper } from './color-helper';

import { styles } from './design-token-helper.styles';

export class DesignTokenHelper {
  public static readonly breakpoints = styles.breakpoints;
  public static readonly softKeyboardTransitionEnter = styles.softKeyboardTransitionEnter.join(' ');
  public static readonly softKeyboardTransitionLeave = styles.softKeyboardTransitionLeave.join(' ');
  public static readonly modalDefaultHeight = styles.modalDefaultHeight;
  public static readonly drawerDefaultHeight = styles.drawerDefaultHeight;

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
      hex: ColorHelper.getThemeColorHexString(colorVariant),
    };
  }

  public static getTextColor(
    name: ThemeColorExtended,
    variant?: ThemeColorVariant
  ): ThemeColorDefinition {
    const variantSuffix = variant ? `-${variant}` : '';
    const colorVariant = `${name}${variantSuffix}`;
    return {
      name: name,
      variant: variant,
      fullname: colorVariant,
      value: ColorHelper.getThemeTextColorRgbString(colorVariant),
      hex: ColorHelper.getThemeTextColorHexString(colorVariant),
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

  public static fatFingerSize(): string {
    return styles.fatFingerSize;
  }

  public static getElevation(z: 2 | 4 | 8): string {
    return styles.elevationsRgb[z];
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
  hex?: string;
}
