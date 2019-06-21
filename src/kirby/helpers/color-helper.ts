declare var require: any;
export class ColorHelper {
  static style: any = require('sass-extract-loader!./color-helper.scss');
  public static getThemeColor(name: string) {
    return ColorHelper.getColor(name);
  }
  public static getContrastColor(name: string) {
    return ColorHelper.getColor(name + '-contrast');
  }
  public static getAlphaIn255Range(alpha: number): number {
    const defaultAlpha = 0.5;
    if (!alpha) {
      alpha = defaultAlpha;
    }
    if (alpha <= 0) {
      return 255;
    } else if (alpha >= 1) {
      return 0;
    } else {
      return alpha * 25500;
    }
  }
  private static getColor(name: string) {
    const color = ColorHelper.style.global['$kirby-colors'].value[name];
    return color ? color.value : undefined;
  }
}
