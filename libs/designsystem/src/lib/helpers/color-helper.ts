import { styles } from './color-helper.styles';

export type GroupedColors = { [key: string]: string | RgbColor };

export class ColorHelper {
  public static getMainColors(): Color[] {
    const mainColors = styles.mainColors;
    // Do not remove the `named` const, since it'll break the ngpackagr build, for more info see:
    // https://github.com/ng-packagr/ng-packagr/issues/696
    const named = Object.entries(mainColors).map(([name, value]) => ({ name, value }));
    return named;
  }

  public static getBrandColors(): Readonly<GroupedColors> {
    return styles.brandColors;
  }

  public static getSystemColors(): Readonly<GroupedColors> {
    return styles.systemColors;
  }

  public static getNotificationColors(): Readonly<GroupedColors> {
    return styles.notificationColors;
  }

  public static getTextColors(): Readonly<GroupedColors> {
    return styles.textColors;
  }

  public static getGeneratedColors(): Readonly<GroupedColors> {
    return styles.kirbyColors;
  }

  public static getBackgroundColorRgbString() {
    return ColorHelper.getRgbString(ColorHelper.getGeneratedColor('background-color'));
  }

  private static getThemeColor(name: string) {
    return ColorHelper.getGeneratedColor(name);
  }

  public static getColorBrightness(name: string) {
    return ColorHelper.getGeneratedColor(name + '-color-brightness');
  }

  public static getThemeColorRgbString(name: string) {
    return ColorHelper.getRgbString(ColorHelper.getThemeColor(name));
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

  private static getRgbString(color: RgbColor | string): string {
    if (!color) {
      return undefined;
    }
    if (typeof color === 'string') {
      return ColorHelper.colorStringToRgbString(color);
    } else {
      return ColorHelper.rgbToRgbString(color);
    }
  }

  private static rgbToRgbString(color: RgbColor): string {
    const hasAlpha = color.a != 1;
    return hasAlpha
      ? `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`
      : `rgb(${color.r}, ${color.g}, ${color.b})`;
  }

  private static RGBToHex(rgb: string): string {
    // Turn "rgb(r,g,b)" into [r,g,b]
    const rgbArray = rgb
      .substr(4)
      .split(')')[0]
      .split(', ');

    let r = (+rgbArray[0]).toString(16),
      g = (+rgbArray[1]).toString(16),
      b = (+rgbArray[2]).toString(16);

    if (r.length == 1) r = '0' + r;
    if (g.length == 1) g = '0' + g;
    if (b.length == 1) b = '0' + b;

    return '#' + r + g + b;
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

  private static getGeneratedColor(name: string): string | RgbColor {
    return ColorHelper.getColor(ColorHelper.getGeneratedColors(), name);
  }

  private static getColor(group: GroupedColors, name: string): string | RgbColor {
    const camelCaseKey = ColorHelper.kebabToCamelCase(name);
    const found = group[camelCaseKey];
    return found || null;
  }

  public static kebabToCamelCase(key: string) {
    // Do not remove the `keyInCamelCase` const, since it'll break the ngpackagr build, for more info see:
    // https://github.com/ng-packagr/ng-packagr/issues/696
    const keyInCamelCase = key
      .split('-')
      .map((part, index) => (index === 0 ? part : part[0].toUpperCase() + part.substr(1)))
      .join('');
    return keyInCamelCase;
  }

  public static camelToKebabCase(key: string) {
    // Do not remove the `keyInKebabCase` const, since it'll break the ngpackagr build, for more info see:
    // https://github.com/ng-packagr/ng-packagr/issues/696
    let keyInKebabCase = key
      .split('')
      .map((char) => {
        const isUppercase = char.toUpperCase() === char;
        return isUppercase ? `-${char.toLowerCase()}` : char;
      })
      .join('');
    return keyInKebabCase;
  }
}

export interface Color {
  name: string;
  value: RgbColor;
}

export interface RgbColor {
  a: number;
  r: number;
  g: number;
  b: number;
  hex: string;
}
