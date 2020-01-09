declare namespace jasmine {
  interface Matchers<T> {
    toHaveStyle(styles: { [cssProperty: string]: string }): boolean;
    toHaveThemeColorStyle(styles: {
      [cssProperty: string]: import('../helpers/design-token-helper').ThemeColorDefinition;
    }): boolean;
  }
}
