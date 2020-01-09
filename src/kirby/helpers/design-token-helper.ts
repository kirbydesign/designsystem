declare var require: any;
export class DesignTokenHelper {
  static designTokens: any = require('sass-extract-loader?{"plugins": ["compact"]}!./design-token-helper.scss');

  public static size(key: string): number {
    return DesignTokenHelper.designTokens.global['$sizes'][key];
  }

  public static borderRadius(includeUnit = false): number | string {
    const value = DesignTokenHelper.designTokens.global['$border-radius'];
    return includeUnit ? value + 'px' : value;
  }

  public static borderRadiusRound(includeUnit = false): number | string {
    const value = DesignTokenHelper.designTokens.global['$border-radius-round'];
    return includeUnit ? value + 'px' : value;
  }
}
