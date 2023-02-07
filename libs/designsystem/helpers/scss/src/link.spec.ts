import { DesignTokenHelper } from '@kirbydesign/designsystem/helpers';

const { getColor } = DesignTokenHelper;

describe('Anchor tag', () => {
  let element: HTMLElement;

  afterEach(() => {
    document.body.removeChild(element);
  });
  describe(`by default`, () => {
    beforeEach(() => {
      const fixture = `<a href="/test/" id="fixture">Text</a>`;
      document.body.insertAdjacentHTML('afterbegin', fixture);
      document.body.style.color = getColor('black').value;
      element = document.body.querySelector('#fixture');
    });

    it(`should inherit its color`, () => {
      expect(element).toHaveComputedStyle({ color: getColor('black') });
    });

    it(`should be styled with an underline`, () => {
      expect(element).toHaveComputedStyle({ 'text-decoration-line': 'underline' });
    });

    it(`should be styled with a pointer as the cursor`, () => {
      expect(element).toHaveComputedStyle({ cursor: 'pointer' });
    });
  });

  describe(`with class for link-icon applied`, () => {
    beforeEach(() => {
      const fixture = `<a href="/test/" class="kirby-external-icon" id="fixture">Text</a>`;
      document.body.insertAdjacentHTML('afterbegin', fixture);
      element = document.body.querySelector('#fixture');
    });

    it(`should have a link icon`, () => {
      const baseURI = window.document.baseURI;

      expect(element).toHaveComputedStyle({
        'background-image': `url("${baseURI}assets/kirby/icons/svg/link.svg")`,
      });
    });
  });
});
