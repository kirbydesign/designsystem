import { ColorHelper } from './color-helper';
import { styles } from './design-token-helper.styles';
import { ThemeColor } from './theme-color.type';

export class DesignTokenHelper {
  public static readonly breakpoints = styles.breakpoints;
  public static readonly softKeyboardTransitionEnter = styles.softKeyboardTransitionEnter;
  public static readonly softKeyboardTransitionLeave = styles.softKeyboardTransitionLeave;
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

  public static getDecorationColor(name: string, step: number) {
    return {
      name: name,
      step: step,
      fullname: `${name}-${step}`,
      value: ColorHelper.getThemeDecorationColorRgbString(name, step),
      hex: ColorHelper.getThemeDecorationColorHexString(name, step),
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

  public static size(key: keyof typeof styles.sizes): string {
    return styles.sizes[key];
  }

  public static fontSize(key: keyof typeof styles.fontSizes): string {
    return styles.fontSizes[key];
  }

  public static iconFontSize(key: keyof typeof styles.iconFontSizes): string {
    return styles.iconFontSizes[key];
  }

  public static fontWeight(key: keyof typeof styles.fontWeight): string {
    return styles.fontWeight[key];
  }

  public static lineHeight(key: keyof typeof styles.lineHeight): string {
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

  public static avatarSize(key: keyof typeof styles.avatarSizes): string {
    return styles.avatarSizes[key];
  }

  public static fatFingerSize(): string {
    return styles.fatFingerSize;
  }

  public static getElevation(z: keyof typeof styles.elevations): string {
    return styles.elevations[z];
  }

  public static itemHeight(key: keyof typeof styles.itemHeights): string {
    return styles.itemHeights[key];
  }

  public static transitionDuration(key: keyof typeof styles.transitionDurations): string {
    return styles.transitionDurations[key];
  }

  public static transitionEasings() {
    return styles.transitionEasings;
  }
  public static zLayer(key: keyof typeof styles.zLayers): string {
    return styles.zLayers[key];
  }

  public static pageContentMaxWidth(key: keyof typeof styles.pageContentMaxWidths): string {
    return styles.pageContentMaxWidths[key];
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
