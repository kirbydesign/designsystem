declare var require: any;

export class ColorHelper {
  static style: any = require('sass-extract-loader!./color-helper.scss');

  public static getThemeColor(name: string) {
    return ColorHelper.style.global['$kirby-colors'].value[name].value;
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
}
