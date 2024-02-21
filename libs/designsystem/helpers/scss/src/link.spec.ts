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
      console.log('document.body.style.color - BEFORE:', document.body.style.color);
      document.body.style.color = getColor('black').value;
      console.log('document.body.style.color - AFTER:', document.body.style.color);
      element = document.body.querySelector('#fixture');
    });

    it(`should inherit its color`, () => {
      expect(document.body).toHaveComputedStyle({ color: getColor('black') });
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
