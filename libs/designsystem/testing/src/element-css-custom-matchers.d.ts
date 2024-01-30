declare namespace jasmine {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
