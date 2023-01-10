import { DesignTokenHelper } from '@kirbydesign/designsystem/helpers';

const { getColor } = DesignTokenHelper;

describe('ThemeColor directive', () => {
  let element: HTMLElement;

  describe(`should apply`, () => {
    beforeEach(() => {});

    it(`should inherit its color`, () => {
      expect(element).toHaveComputedStyle({ color: getColor('black') });
    });
  });
});
