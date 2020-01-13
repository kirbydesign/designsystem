declare namespace jasmine {
  interface Matchers<T> {
    toHaveComputedStyle(styles: {
      [cssProperty: string]: string | import('../helpers/design-token-helper').ThemeColorDefinition;
    }): boolean;
  }
}
