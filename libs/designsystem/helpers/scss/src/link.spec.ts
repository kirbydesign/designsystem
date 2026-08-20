import { DesignTokenHelper } from '@kirbydesign/designsystem/helpers';

const { getColor } = DesignTokenHelper;

describe('Anchor tag', () => {
  let element: HTMLAnchorElement;

  beforeEach(() => {
    element = document.createElement('a');
    element.id = 'fixture';
    element.href = '/test/';
    element.text = 'Text';
    element.style.transitionDuration = '0ms';
    document.body.appendChild(element);
  });

  afterEach(() => {
    document.body.removeChild(element);
  });

  describe(`by default`, () => {
    it(`should inherit its color`, () => {
      document.body.style.color = getColor('black').value;

      expect(element).toHaveComputedStyle({ color: getColor('black') });
      document.body.style.removeProperty('color');
    });

    it(`should be styled with an underline`, () => {
      expect(element).toHaveComputedStyle({ 'text-decoration-line': 'underline' });
    });

    it(`should be styled with a pointer as the cursor`, () => {
      expect(element).toHaveComputedStyle({ cursor: 'pointer' });
    });
  });

  describe(`with class for link-icon applied`, () => {
    it(`should have a link icon`, () => {
      element.className = 'kirby-external-icon';
      const defaultDensityPixel = '1dppx';
      const linkIconUrl = new URL('assets/kirby/icons/svg/link.svg', document.baseURI).href;

      expect(element).toHaveComputedStyle({
        'background-image': `image-set(url("${linkIconUrl}") ${defaultDensityPixel})`,
      });
    });
  });
});
