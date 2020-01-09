declare namespace jasmine {
  interface Matchers<T> {
    toHaveStyle(styles: { [styleKey: string]: string }): boolean;
    toHaveBackgroundColor(expected: string): boolean;
    toHaveBorderColor(expected: string): boolean;
    toHaveColor(expected: string): boolean;
    toHaveThemeColor(
      expectedColor:
        | import('../helpers/theme-color.type').ThemeColor
        | 'black'
        | 'semi-light'
        | 'semi-dark',
      expectedVariant?: import('../helpers/theme-color.type').ThemeColorVariant
    ): boolean;
    toHaveThemeBackgroundColor(
      expectedColor:
        | import('../helpers/theme-color.type').ThemeColor
        | 'black'
        | 'semi-light'
        | 'semi-dark',
      expectedVariant?: import('../helpers/theme-color.type').ThemeColorVariant
    ): boolean;
    toHaveThemeBorderColor(
      expectedColor:
        | import('../helpers/theme-color.type').ThemeColor
        | 'black'
        | 'semi-light'
        | 'semi-dark',
      expectedVariant?: import('../helpers/theme-color.type').ThemeColorVariant
    ): boolean;
  }
}
