declare var require: any;
export class ColorHelper {
  static colors: any = require('sass-extract-loader?{"plugins": ["compact"]}!./color-helper.scss');

  public static getMainColors() {
    const mainColors = ColorHelper.colors.global['$main-colors'];
    return Object.entries(mainColors).map((color: [string, RgbColor]) => {
      return {
        name: color[0],
        value: color[1],
      };
    });
  }

  public static getBackgroundColorRgbString() {
    return ColorHelper.getRgbString(ColorHelper.getColor('background-color'));
  }

  private static getThemeColor(name: string) {
    return ColorHelper.getColor(name);
  }

  public static getColorBrightness(name: string) {
    return ColorHelper.getColor(name + '-color-brightness');
  }

  public static getThemeColorRgbString(name: string) {
    return ColorHelper.getRgbString(ColorHelper.getThemeColor(name));
  }

  public static getTransparentColorRgbString() {
    return 'rgba(0, 0, 0, 0)';
  }

  private static getRgbString(color: RgbColor | string) {
    if (!color) {
      return undefined;
    }
    if (typeof color === 'string') {
      return ColorHelper.colorStringToRgbString(color);
    } else {
      return ColorHelper.rgbToRgbString(color);
    }
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

  private static rgbToRgbString(color: RgbColor) {
    const hasAlpha = color.a != 1;
    return hasAlpha
      ? `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`
      : `rgb(${color.r}, ${color.g}, ${color.b})`;
  }

  private static RGBToHex(rgb: string) {
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

  private static hexToRGB(hex: string) {
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

  private static getColor(name: string): string | RgbColor {
    return ColorHelper.colors.global['$kirby-colors'][name];
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
