declare namespace jasmine {
  interface Matchers<T> {
    toHaveComputedStyle(
      styles: {
        [cssProperty: string]:
          | string
          | import('@kirbydesign/designsystem/helpers').ThemeColorDefinition;
      },
      pseudoElt?: string
    ): boolean;
  }
}
