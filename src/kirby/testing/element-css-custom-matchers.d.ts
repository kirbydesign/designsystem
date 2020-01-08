declare namespace jasmine {
  interface Matchers<T> {
    toHaveBackgroundColor(expected: string): boolean;
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
  }
}
