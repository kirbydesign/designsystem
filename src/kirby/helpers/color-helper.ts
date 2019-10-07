declare var require: any;
export class ColorHelper {
  static style: any = require('sass-extract-loader!./color-helper.scss');

  public static getMainColors() {
    const mainColors = ColorHelper.style.global['$main-colors'].value;
    return Object.entries(mainColors).map((color: [string, Color]) => {
      return {
        name: color[0],
        type: color[1].type,
        value: color[1].value,
      };
    });
  }

  public static getBackgroundColor() {
    return ColorHelper.getColor('background-color');
  }

  public static getThemeColor(name: string) {
    return ColorHelper.getColor(name);
  }

  public static getContrastColor(name: string) {
    return ColorHelper.getColor(name + '-contrast');
  }

  public static getColorBrightness(name: string) {
    return ColorHelper.getColor(name + '-color-brightness');
  }

  public static getThemeColorRgbString(name: string) {
    return ColorHelper.getRgbString(ColorHelper.getThemeColor(name));
  }

  public static getRgbString(color: RgbColor) {
    if (!color) {
      return undefined;
    }
    return `rgb(${color.r}, ${color.g}, ${color.b})`;
  }

  private static getColor(name: string) {
    const color = ColorHelper.style.global['$kirby-colors'].value[name];
    return color ? color.value : undefined;
  }
}

export interface Color {
  name: string;
  type: string;
  value: RgbColor;
}

export interface RgbColor {
  a: number;
  r: number;
  g: number;
  b: number;
  hex: string;
}
