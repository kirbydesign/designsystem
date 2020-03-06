import { styles } from './color-helper.styles';

type KirbyColorGroup = { [key: string]: string };

export class ColorHelper {
  static readonly brandColors = ColorHelper.mapToKirbyColorArray(styles.brandColors);
  static readonly notificationColors = ColorHelper.mapToKirbyColorArray(styles.notificationColors);
  static readonly systemColors = ColorHelper.mapToKirbyColorArray(styles.systemColors);
  static readonly textColors = ColorHelper.mapToKirbyColorArray(styles.textColors);
  static readonly mainColors = ColorHelper.getMainColors();

  private static getMainColors(): Color[] {
    // Do not remove the `colorArray` const, since it'll break the ngpackagr build, for more info see:
    // https://github.com/ng-packagr/ng-packagr/issues/696
    const colorArray = Object.entries(styles.mainColors).map(([name, value]) => ({ name, value }));
    return colorArray;
  }

  private static mapToKirbyColorArray(colors: KirbyColorGroup): KirbyColor[] {
    const TINT = 'Tint';
    const SHADE = 'Shade';
    const CONTRAST = 'Contrast';
    const colorArray = Object.entries(colors).map(([name, value]) => ({
      name: ColorHelper.camelToKebabCase(name),
      value,
      base: value,
      tint: {
        value: styles.kirbyColors[name + TINT],
        name: ColorHelper.camelToKebabCase(name + TINT),
      },
      shade: {
        value: styles.kirbyColors[name + SHADE],
        name: ColorHelper.camelToKebabCase(name + SHADE),
      },
      contrast: {
        value: styles.kirbyColors[name + CONTRAST],
        name: ColorHelper.camelToKebabCase(name + CONTRAST),
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
    const camelCaseKey = ColorHelper.kebabToCamelCase(name);
    const found = styles.kirbyColors[camelCaseKey];
    return found || null;
  }

  private static kebabToCamelCase(key: string) {
    // Do not remove the `keyInCamelCase` const, since it'll break the ngpackagr build, for more info see:
    // https://github.com/ng-packagr/ng-packagr/issues/696
    const keyInCamelCase = key
      .split('-')
      .map((part, index) => (index === 0 ? part : part[0].toUpperCase() + part.substr(1)))
      .join('');
    return keyInCamelCase;
  }

  private static camelToKebabCase(key: string) {
    // Do not remove the `keyInKebabCase` const, since it'll break the ngpackagr build, for more info see:
    // https://github.com/ng-packagr/ng-packagr/issues/696
    const keyInKebabCase = key
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
