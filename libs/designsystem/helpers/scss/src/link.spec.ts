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
      const baseURI = window.document.baseURI;
      element.className = 'kirby-external-icon';

      expect(element).toHaveComputedStyle({
        'background-image': `url("${baseURI}assets/kirby/icons/svg/link.svg")`,
      });
    });
  });
});
