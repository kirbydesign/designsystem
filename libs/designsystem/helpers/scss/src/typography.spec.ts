describe('Typography', () => {
  let element: HTMLElement;

  afterEach(() => {
    document.body.removeChild(element);
  });

  describe('default paragraph', () => {
    beforeEach(() => {
      const fixture = `<p id="fixture">Text</p>`;
      document.body.insertAdjacentHTML('afterbegin', fixture);
      element = document.body.querySelector('#fixture');
    });

    it(`should be rendered with font-size: 16px`, () => {
      expect(element).toHaveComputedStyle({ 'font-size': '16px' });
    });

    it(`should be rendered with font-weight: 400`, () => {
      expect(element).toHaveComputedStyle({ 'font-weight': '400' });
    });

    it(`should be rendered with line-height: 24px`, () => {
      expect(element).toHaveComputedStyle({ 'line-height': '24px' });
    });

    it(`should be rendered with correct margin`, () => {
      expect(element).toHaveComputedStyle({
        'margin-top': '0px',
        'margin-right': '0px',
        'margin-left': '0px',
        'margin-bottom': '16px',
      });
    });
  });

  describe('display font', () => {
    const displayFonts = {
      'display 1': {
        cssClass: 'kirby-text-display-1',
        fontSize: '72px',
        fontWeight: '900',
        lineHeight: 'normal',
      },
      'display 2': {
        cssClass: 'kirby-text-display-2',
        fontSize: '56px',
        fontWeight: '900',
        lineHeight: 'normal',
      },
      'display 3': {
        cssClass: 'kirby-text-display-3',
        fontSize: '40px',
        fontWeight: '900',
        lineHeight: 'normal',
      },
    };

    for (const displayFontName in displayFonts) {
      const displayFont = displayFonts[displayFontName];
      describe(`${displayFontName} set by applying class '${displayFont.cssClass}' to parapgraph`, () => {
        beforeEach(() => {
          const fixture = `<p class="${displayFont.cssClass}" id="fixture">Text</p>`;
          document.body.insertAdjacentHTML('afterbegin', fixture);
          element = document.body.querySelector('#fixture');
        });

        it(`should be rendered with font-size: ${displayFont.fontSize}`, () => {
          expect(element).toHaveComputedStyle({ 'font-size': displayFont.fontSize });
        });

        it(`should be rendered with font-weight: ${displayFont.fontWeight}`, () => {
          expect(element).toHaveComputedStyle({ 'font-weight': displayFont.fontWeight });
        });

        it(`should be rendered with line-height: ${displayFont.lineHeight}`, () => {
          expect(element).toHaveComputedStyle({ 'line-height': displayFont.lineHeight });
        });

        it(`should be rendered with correct margin`, () => {
          expect(element).toHaveComputedStyle({
            'margin-top': '0px',
            'margin-right': '0px',
            'margin-left': '0px',
            'margin-bottom': '16px',
          });
        });
      });
    }
  });

  describe('heading', () => {
    const headings = {
      'heading 1': {
        tag: 'h1',
        cssClasses: ['h1', 'kirby-text-xlarge'],
        fontSize: '32px',
        fontWeight: '900',
        lineHeight: '38px',
      },
      'heading 2': {
        tag: 'h2',
        cssClasses: ['h2', 'kirby-text-large'],
        fontSize: '22px',
        fontWeight: '700',
        lineHeight: '28px',
      },
      'heading 3': {
        tag: 'h3',
        cssClasses: ['h3', 'kirby-text-medium'],
        fontSize: '18px',
        fontWeight: '700',
        lineHeight: '24px',
      },
      'heading 4': {
        tag: 'h4',
        cssClasses: ['h4', 'kirby-text-normal-bold'],
        fontSize: '16px',
        fontWeight: '700',
        lineHeight: '24px',
      },
    };

    for (const headingName in headings) {
      const heading = headings[headingName];
      describe(`${headingName} set by tag '<${heading.tag}>'`, () => {
        beforeEach(() => {
          const fixture = `<${heading.tag} id="fixture">Text</${heading.tag}>`;
          document.body.insertAdjacentHTML('afterbegin', fixture);
          element = document.body.querySelector('#fixture');
        });

        it(`should be rendered with font-size: ${heading.fontSize}`, () => {
          expect(element).toHaveComputedStyle({ 'font-size': heading.fontSize });
        });

        it(`should be rendered with font-weight: ${heading.fontWeight}`, () => {
          expect(element).toHaveComputedStyle({ 'font-weight': heading.fontWeight });
        });

        it(`should be rendered with line-height: ${heading.lineHeight}`, () => {
          expect(element).toHaveComputedStyle({ 'line-height': heading.lineHeight });
        });

        it(`should be rendered with correct margin`, () => {
          expect(element).toHaveComputedStyle({
            'margin-top': '0px',
            'margin-right': '0px',
            'margin-left': '0px',
            'margin-bottom': '16px',
          });
        });
      });

      for (const cssClass of heading.cssClasses) {
        describe(`${headingName} set by applying class '${cssClass}' to parapgraph`, () => {
          beforeEach(() => {
            const fixture = `<p class="${cssClass}" id="fixture">Text</p>`;
            document.body.insertAdjacentHTML('afterbegin', fixture);
            element = document.body.querySelector('#fixture');
          });

          it(`should be rendered with font-size: ${heading.fontSize}`, () => {
            expect(element).toHaveComputedStyle({ 'font-size': heading.fontSize });
          });

          it(`should be rendered with font-weight: ${heading.fontWeight}`, () => {
            expect(element).toHaveComputedStyle({ 'font-weight': heading.fontWeight });
          });

          it(`should be rendered with line-height: ${heading.lineHeight}`, () => {
            expect(element).toHaveComputedStyle({ 'line-height': heading.lineHeight });
          });

          it(`should be rendered with correct margin`, () => {
            expect(element).toHaveComputedStyle({
              'margin-top': '0px',
              'margin-right': '0px',
              'margin-left': '0px',
              'margin-bottom': '16px',
            });
          });
        });
      }
    }
  });

  describe('text', () => {
    const texts = {
      'small text': {
        cssClass: 'kirby-text-small',
        fontSize: '14px',
        fontWeight: '400',
        lineHeight: '20px',
      },
      'small text light': {
        cssClass: 'kirby-text-small-light',
        fontSize: '14px',
        fontWeight: '300',
        lineHeight: '20px',
      },
      'x-small text': {
        cssClass: 'kirby-text-xsmall',
        fontSize: '12px',
        fontWeight: '400',
        lineHeight: '16px',
      },
      'xx-small text': {
        cssClass: 'kirby-text-xxsmall',
        fontSize: '10px',
        fontWeight: '400',
        lineHeight: '11px',
      },
    };

    for (const textName in texts) {
      const text = texts[textName];
      describe(`${textName} set by applying class '${text.cssClass}' to parapgraph`, () => {
        beforeEach(() => {
          const fixture = `<p class="${text.cssClass}" id="fixture">Text</p>`;
          document.body.insertAdjacentHTML('afterbegin', fixture);
          element = document.body.querySelector('#fixture');
        });

        it(`should be rendered with font-size: ${text.fontSize}`, () => {
          expect(element).toHaveComputedStyle({ 'font-size': text.fontSize });
        });

        it(`should be rendered with font-weight: ${text.fontWeight}`, () => {
          expect(element).toHaveComputedStyle({ 'font-weight': text.fontWeight });
        });

        it(`should be rendered with line-height: ${text.lineHeight}`, () => {
          expect(element).toHaveComputedStyle({ 'line-height': text.lineHeight });
        });

        it(`should be rendered with correct margin`, () => {
          expect(element).toHaveComputedStyle({
            'margin-top': '0px',
            'margin-right': '0px',
            'margin-left': '0px',
            'margin-bottom': '16px',
          });
        });
      });
    }
  });
});
