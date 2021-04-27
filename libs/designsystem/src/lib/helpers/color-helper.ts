import { styles } from './color-helper.styles';
import { camelToKebabCase, kebabToCamelCase } from './string-helper';

type KirbyColorGroup = { [key: string]: string };

export class ColorHelper {
  static readonly brandColors = ColorHelper.mapToKirbyColorArray(styles.brandColors);
  static readonly notificationColors = ColorHelper.mapToKirbyColorArray(styles.notificationColors);
  static readonly systemColors = ColorHelper.mapToKirbyColorArray(styles.systemColors);
  static readonly textColors = ColorHelper.mapToKirbyColorArray(
    styles.textColors,
    styles.kirbyTextColors
  );
  static readonly mainColors = ColorHelper.getMainColors();

  private static getMainColors(): Color[] {
    // Do not remove the `colorArray` const, since it'll break the ngpackagr build, for more info see:
    // https://github.com/ng-packagr/ng-packagr/issues/696
    const colorArray = Object.entries(styles.mainColors).map(([name, value]) => ({ name, value }));
    return colorArray;
  }

  private static mapToKirbyColorArray(
    colors: KirbyColorGroup,
    fullColorMap: KirbyColorGroup = styles.kirbyColors
  ): KirbyColor[] {
    const TINT = 'Tint';
    const SHADE = 'Shade';
    const CONTRAST = 'Contrast';
    const colorArray = Object.entries(colors).map(([name, value]) => ({
      name: camelToKebabCase(name),
      value,
      base: value,
      tint: {
        value: fullColorMap[name + TINT],
        name: camelToKebabCase(name + TINT),
      },
      shade: {
        value: fullColorMap[name + SHADE],
        name: camelToKebabCase(name + SHADE),
      },
      contrast: {
        value: fullColorMap[name + CONTRAST],
        name: camelToKebabCase(name + CONTRAST),
      },
    }));
    // Do not remove the `colorArray` const, since it'll break the ngpackagr build, for more info see:
    // https://github.com/ng-packagr/ng-packagr/issues/696
    return colorArray;
  }

  public static getBackgroundColor() {
    return ColorHelper.getColor('background-color');
  }

  public static getColorBrightness(name: string) {
    return ColorHelper.getColor(name + '-color-brightness');
  }

  public static getThemeColorRgbString(name: string) {
    const rgbValue = ColorHelper.getColor(name + '-rgb');
    return `rgb(${rgbValue})`;
  }

  public static getThemeTextColorRgbString(name: string) {
    const rgbValue = ColorHelper.getTextColor(name + '-rgb');
    return `rgb(${rgbValue})`;
  }

  public static getThemeColorHexString(name: string) {
    return ColorHelper.getColor(name);
  }

  public static getThemeTextColorHexString(name: string) {
    return ColorHelper.getTextColor(name);
  }

  public static getTransparentColorRgbString() {
    return 'rgba(0, 0, 0, 0)';
  }

  public static colorStringToRgbString(color: string) {
    if (color.indexOf('rgb') === 0) {
      return color;
    }
    if (color.indexOf('#') === 0) {
      return ColorHelper.hexToRGB(color);
    }
    if (color.split(',').length === 3) {
      return `rgb(${color})`;
    }
    if (color.split(',').length === 4) {
      return `rgba(${color})`;
    }
    const ctx = document.createElement('canvas').getContext('2d');
    ctx.fillStyle = color;
    const renderedColor = ctx.fillStyle.toString();
    return ColorHelper.colorStringToRgbString(renderedColor);
  }

  private static hexToRGB(hex: string): string {
    let r = '0',
      g = '0',
      b = '0';

    // 3 digits
    if (hex.length === 4) {
      r = '0x' + hex[1] + hex[1];
      g = '0x' + hex[2] + hex[2];
      b = '0x' + hex[3] + hex[3];

      // 6 digits
    } else if (hex.length === 7) {
      r = '0x' + hex[1] + hex[2];
      g = '0x' + hex[3] + hex[4];
      b = '0x' + hex[5] + hex[6];
    }

    return `rgb(${+r}, ${+g}, ${+b})`;
  }

  private static getColor(name: string): string {
    const camelCaseKey = kebabToCamelCase(name);
    const found = styles.kirbyColors[camelCaseKey];
    return found || null;
  }

  private static getTextColor(name: string): string {
    const camelCaseKey = kebabToCamelCase(name);
    const found = styles.kirbyTextColors[camelCaseKey];
    return found || null;
  }
}

export interface Color {
  name: string;
  /**
   * The color value in either hex (#ff0000), rgb(255,0,0) or rgba(255,0,0,1)
   */
  value: string;
}

export interface KirbyColor extends Color {
  base: string;
  tint: Color;
  shade: Color;
  contrast: Color;
}

export type NotificationColor = keyof typeof styles.notificationColors;
export type BrandColor = keyof typeof styles.brandColors;
