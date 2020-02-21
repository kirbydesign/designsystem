import { ThemeColor } from './theme-color.type';
import { ColorHelper } from './color-helper';

// @ts-ignore
import { data as designTokens } from './design-token-helper.styling';

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
    return DesignTokenHelper.sizeValue(designTokens.$sizes[key]);
  }

  public static fontSize(key: string): string {
    return DesignTokenHelper.sizeValue(designTokens.$font_sizes[key]);
  }

  public static borderRadius(): string {
    return DesignTokenHelper.sizeValue(designTokens.$border_radius);
  }

  public static borderRadiusRound(): string {
    return DesignTokenHelper.sizeValue(designTokens.$border_radius_round);
  }

  private static sizeValue(entry: { value: number; unit: string }): string {
    return entry.value + entry.unit;
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
