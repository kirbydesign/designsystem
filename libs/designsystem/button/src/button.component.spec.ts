import { createHostFactory, SpectatorHost } from '@ngneat/spectator';
import { MockComponent } from 'ng-mocks';

import { DesignTokenHelper } from '@kirbydesign/designsystem/helpers';
import { IconComponent } from '@kirbydesign/designsystem/icon';

import { ButtonComponent, ButtonSize } from './button.component';

const { getColor, size, fontSize, fatFingerSize } = DesignTokenHelper;

describe('ButtonComponent', () => {
  let spectator: SpectatorHost<ButtonComponent>;
  let element: HTMLButtonElement;

  const createHost = createHostFactory({
    component: ButtonComponent,
    declarations: [MockComponent(IconComponent)],
  });

  describe('by default', () => {
    beforeEach(() => {
      spectator = createHost('<button kirby-button>Test</button>');
      element = spectator.element as HTMLButtonElement;
    });

    it('should create', () => {
      expect(spectator.component).toBeTruthy();
    });

    it('should render with correct background-color', () => {
      expect(element).toHaveComputedStyle({
        'background-color': getColor('primary'),
      });
    });

    it('should render with correct color', () => {
      expect(element).toHaveComputedStyle({ color: getColor('primary', 'contrast') });
    });

    it('should render without outline', () => {
      expect(element).toHaveComputedStyle({
        'outline-width': '0px',
        'outline-style': 'none',
      });
    });

    it('should render with correct border-radius', () => {
      const expected = DesignTokenHelper.borderRadiusRound();

      expect(element).toHaveComputedStyle({ 'border-radius': expected });
    });

    it('should render with correct font-size', () => {
      expect(element).toHaveComputedStyle({ 'font-size': fontSize('s') });
    });

    it('should render with correct height', () => {
      expect(element).toHaveComputedStyle({ height: size('xl') });
    });

    it('should render with correct margin', () => {
      expect(element).toHaveComputedStyle({ margin: size('xxxs') });
    });

    it('should have touch area with minimum size equal to fat finger size', () => {
      const touchArea = window.getComputedStyle(element, '::after');

      expect(parseInt(touchArea.height)).toBeGreaterThanOrEqual(parseInt(fatFingerSize()));
      expect(parseInt(touchArea.width)).toBeGreaterThanOrEqual(parseInt(fatFingerSize()));
    });

    describe('when disabled', () => {
      beforeEach(() => {
        element.disabled = true;
      });

      it('should render with correct background-color', () => {
        expect(element).toHaveComputedStyle({
          'background-color': getColor('semi-light'),
        });
      });

      it('should render with correct color', () => {
        expect(element).toHaveComputedStyle({
          color: getColor('semi-dark', 'shade'),
        });
      });
    });

    describe('when configured with attentionlevel 1', () => {
      beforeEach(() => {
        spectator.component.attentionLevel = '1';
        spectator.detectChanges();
      });

      it('should render with correct background-color', () => {
        expect(element).toHaveComputedStyle({
          'background-color': getColor('primary'),
        });
      });

      it('should render with correct color', () => {
        expect(element).toHaveComputedStyle({
          color: getColor('primary', 'contrast'),
        });
      });
    });

    describe('when configured with attentionlevel 2', () => {
      beforeEach(() => {
        spectator.component.attentionLevel = '2';
        spectator.detectChanges();
      });

      it('should render with correct background-color', () => {
        expect(element).toHaveComputedStyle({
          'background-color': getColor('black'),
        });
      });

      it('should render with correct color', () => {
        expect(element).toHaveComputedStyle({
          color: getColor('black', 'contrast'),
        });
      });
    });

    describe('when configured with attentionlevel 3', () => {
      beforeEach(() => {
        spectator.component.attentionLevel = '3';
        spectator.detectChanges();
      });

      it('should render with correct background-color', () => {
        expect(element).toHaveComputedStyle({ 'background-color': getColor('white') });
      });

      it('should render with correct color', () => {
        expect(element).toHaveComputedStyle({
          color: getColor('black'),
        });
      });
    });
  });

  const sizeTestScenarios: { size: ButtonSize; expected: any }[] = [
    {
      size: ButtonSize.XS,
      expected: { fontSize: fontSize('xs'), height: size('m'), minWidth: '44px' },
    },
    {
      size: ButtonSize.SM,
      expected: { fontSize: fontSize('xs'), height: size('l'), minWidth: '44px' },
    },
    {
      size: ButtonSize.MD,
      expected: { fontSize: fontSize('s'), height: size('xl'), minWidth: '88px' },
    },
    {
      size: ButtonSize.LG,
      expected: { fontSize: fontSize('n'), height: size('xxl'), minWidth: '220px' },
    },
  ];
  sizeTestScenarios.forEach((scenario) => {
    describe(`when configured with size = ${scenario.size}`, () => {
      describe(`through one-time string initialization`, () => {
        beforeEach(() => {
          spectator = createHost(
            `<button kirby-button size="${scenario.size}"><span>Text</span></button>`
          );
          element = spectator.element as HTMLButtonElement;
        });
        it('should render with correct font-size', () => {
          expect(element).toHaveComputedStyle({ 'font-size': scenario.expected.fontSize });
        });

        it('should render with correct height', () => {
          expect(element).toHaveComputedStyle({ height: scenario.expected.height });
        });

        it('should render with correct min-width', () => {
          expect(element).toHaveComputedStyle({ 'min-width': scenario.expected.minWidth });
        });
      });

      describe(`through an input property`, () => {
        beforeEach(() => {
          spectator = createHost(`<button kirby-button><span>Text</span></button>`, {
            props: {
              size: scenario.size,
            },
          });
          element = spectator.element as HTMLButtonElement;
        });
        it('should render with correct font-size', () => {
          expect(element).toHaveComputedStyle({ 'font-size': scenario.expected.fontSize });
        });

        it('should render with correct height', () => {
          expect(element).toHaveComputedStyle({ height: scenario.expected.height });
        });

        it('should render with correct min-width', () => {
          expect(element).toHaveComputedStyle({ 'min-width': scenario.expected.minWidth });
        });
      });

      describe(`through template property binding`, () => {
        beforeEach(() => {
          spectator = createHost(
            `<button kirby-button [size]="'${scenario.size}'"><span>Text</span></button>`
          );
          element = spectator.element as HTMLButtonElement;
        });
        it('should render with correct font-size', () => {
          expect(element).toHaveComputedStyle({ 'font-size': scenario.expected.fontSize });
        });

        it('should render with correct height', () => {
          expect(element).toHaveComputedStyle({ height: scenario.expected.height });
        });

        it('should render with correct min-width', () => {
          expect(element).toHaveComputedStyle({ 'min-width': scenario.expected.minWidth });
        });
      });
    });
  });

  const iconTestExpectations = {
    leftXS: { paddingInline: '8px 12px' },
    rightXS: { paddingInline: '12px 8px' },
    left: { paddingInline: '12px 16px' },
    right: { paddingInline: '16px 12px' },
    iconOnly: { paddingInline: '0px' },
  };

  const iconTestScenarios: {
    size: ButtonSize;
    iconPosition: 'left' | 'right' | 'icon-only';
    showIconOnly?: boolean;
    expected: { paddingInline: string };
  }[] = [
    {
      size: ButtonSize.XS,
      iconPosition: 'left',
      expected: iconTestExpectations.leftXS,
    },
    {
      size: ButtonSize.XS,
      iconPosition: 'right',
      expected: iconTestExpectations.rightXS,
    },
    {
      size: ButtonSize.SM,
      iconPosition: 'left',
      expected: iconTestExpectations.left,
    },
    {
      size: ButtonSize.SM,
      iconPosition: 'right',
      expected: iconTestExpectations.right,
    },
    {
      size: ButtonSize.SM,
      iconPosition: 'left',
      showIconOnly: true,
      expected: iconTestExpectations.iconOnly,
    },
    {
      size: ButtonSize.SM,
      iconPosition: 'right',
      showIconOnly: true,
      expected: iconTestExpectations.iconOnly,
    },
    {
      size: ButtonSize.SM,
      iconPosition: 'icon-only',
      expected: iconTestExpectations.iconOnly,
    },
    {
      size: ButtonSize.MD,
      iconPosition: 'left',
      expected: iconTestExpectations.left,
    },
    {
      size: ButtonSize.MD,
      iconPosition: 'right',
      expected: iconTestExpectations.right,
    },
    {
      size: ButtonSize.MD,
      iconPosition: 'left',
      showIconOnly: true,
      expected: iconTestExpectations.iconOnly,
    },
    {
      size: ButtonSize.MD,
      iconPosition: 'right',
      showIconOnly: true,
      expected: iconTestExpectations.iconOnly,
    },
    {
      size: ButtonSize.MD,
      iconPosition: 'icon-only',
      expected: iconTestExpectations.iconOnly,
    },
    {
      size: ButtonSize.LG,
      iconPosition: 'left',
      expected: iconTestExpectations.left,
    },
    {
      size: ButtonSize.LG,
      iconPosition: 'right',
      expected: iconTestExpectations.right,
    },
    {
      size: ButtonSize.LG,
      iconPosition: 'left',
      showIconOnly: true,
      expected: iconTestExpectations.iconOnly,
    },
    {
      size: ButtonSize.LG,
      iconPosition: 'right',
      showIconOnly: true,
      expected: iconTestExpectations.iconOnly,
    },
    {
      size: ButtonSize.LG,
      iconPosition: 'icon-only',
      expected: iconTestExpectations.iconOnly,
    },
  ];
  iconTestScenarios.forEach((scenario) => {
    describe(`when configured with size = ${scenario.size} & used with kirby-icon`, () => {
      describe(`through one-time string initialization`, () => {
        beforeEach(() => {
          spectator = createHost(
            `<button kirby-button size="${scenario.size}"${
              scenario.showIconOnly ? ' showIconOnly="true"' : ''
            }>
              ${scenario.iconPosition === 'left' ? '<kirby-icon name="edit"></kirby-icon>' : ''}
              ${
                scenario.iconPosition === 'icon-only'
                  ? '<kirby-icon name="edit"></kirby-icon>'
                  : '<span>Text</span>'
              }
              ${scenario.iconPosition === 'right' ? '<kirby-icon name="edit"></kirby-icon>' : ''}
            </button>`
          );
          element = spectator.element as HTMLButtonElement;
        });
        it('should render with correct padding-inline', () => {
          expect(element.getElementsByClassName('content-layer').length).toBe(1);
          expect(element.getElementsByClassName('content-layer')[0]).toHaveComputedStyle({
            'padding-inline': scenario.expected.paddingInline,
          });
        });

        if (scenario.iconPosition === 'icon-only') {
          it('should render as icon only', () => {
            expect(element).toHaveClass('icon-only');
            expect(element.offsetWidth).toEqual(element.offsetHeight);
          });
        }
      });

      describe(`through an input property`, () => {
        beforeEach(() => {
          spectator = createHost(
            `<button kirby-button>
              ${scenario.iconPosition === 'left' ? '<kirby-icon name="edit"></kirby-icon>' : ''}
              ${
                scenario.iconPosition === 'icon-only'
                  ? '<kirby-icon name="edit"></kirby-icon>'
                  : '<span>Text</span>'
              }
              ${scenario.iconPosition === 'right' ? '<kirby-icon name="edit"></kirby-icon>' : ''}
            </button>`,
            {
              props: {
                size: scenario.size,
                showIconOnly: scenario.showIconOnly,
              },
            }
          );
          element = spectator.element as HTMLButtonElement;
        });

        it('should render with correct padding-inline', () => {
          expect(element.getElementsByClassName('content-layer').length).toBe(1);
          expect(element.getElementsByClassName('content-layer')[0]).toHaveComputedStyle({
            'padding-inline': scenario.expected.paddingInline,
          });
        });

        if (scenario.iconPosition === 'icon-only') {
          it('should render as icon only', () => {
            expect(element).toHaveClass('icon-only');
            expect(element.offsetWidth).toEqual(element.offsetHeight);
          });
        }
      });

      describe(`through template property binding`, () => {
        beforeEach(() => {
          spectator = createHost(
            `<button kirby-button [size]="'${scenario.size}'" [showIconOnly]="${
              scenario.showIconOnly
            }">
              ${scenario.iconPosition === 'left' ? '<kirby-icon name="edit"></kirby-icon>' : ''}
              ${
                scenario.iconPosition === 'icon-only'
                  ? '<kirby-icon name="edit"></kirby-icon>'
                  : '<span>Text</span>'
              }
              ${scenario.iconPosition === 'right' ? '<kirby-icon name="edit"></kirby-icon>' : ''}
            </button>`
          );
          element = spectator.element as HTMLButtonElement;
        });

        it('should render with correct padding-inline', () => {
          expect(element.getElementsByClassName('content-layer').length).toBe(1);
          expect(element.getElementsByClassName('content-layer')[0]).toHaveComputedStyle({
            'padding-inline': scenario.expected.paddingInline,
          });
        });

        if (scenario.iconPosition === 'icon-only') {
          it('should render as icon only', () => {
            expect(element).toHaveClass('icon-only');
            expect(element.offsetWidth).toEqual(element.offsetHeight);
          });
        }
      });
    });
  });

  describe(`when configured with showIconOnly=true`, () => {
    let contentLayer: HTMLElement;

    describe(`and plain text to the left of icon`, () => {
      const text = 'Hidden Text Left';

      beforeEach(() => {
        spectator = createHost(
          `<button kirby-button showIconOnly="true">
            ${text}
            <kirby-icon name="edit"></kirby-icon>
          </button>`
        );
        element = spectator.element as HTMLButtonElement;
        contentLayer = element.querySelector('.content-layer');
      });

      it('should wrap plain text in an element', () => {
        const firstChild = contentLayer.firstChild;
        expect(firstChild.nodeType).not.toBe(Node.TEXT_NODE);
        expect(firstChild.nodeType).toBe(Node.ELEMENT_NODE);
        expect((firstChild as HTMLElement).tagName).toBe('SPAN');
        expect(firstChild.firstChild.nodeType).toBe(Node.TEXT_NODE);
        expect(firstChild.textContent.trim()).toBe(text);
        expect(contentLayer.lastChild).toBe(contentLayer.querySelector('kirby-icon'));
      });

      it('should hide the plain text', () => {
        expect(contentLayer.firstChild).toBeHidden();
      });

      it('should render as icon only', () => {
        expect(element).toHaveClass('icon-only');
        expect(element.offsetWidth).toEqual(element.offsetHeight);
      });
    });

    describe(`and plain text to the right of icon`, () => {
      const text = 'Hidden Text Right';

      beforeEach(() => {
        spectator = createHost(
          `<button kirby-button showIconOnly="true">
            <kirby-icon name="edit"></kirby-icon>
            ${text}
          </button>`
        );
        element = spectator.element as HTMLButtonElement;
        contentLayer = element.querySelector('.content-layer');
      });

      it('should wrap plain text in an element', () => {
        const lastChild = contentLayer.lastChild;
        expect(lastChild.nodeType).not.toBe(Node.TEXT_NODE);
        expect(lastChild.nodeType).toBe(Node.ELEMENT_NODE);
        expect((lastChild as HTMLElement).tagName).toBe('SPAN');
        expect(lastChild.firstChild.nodeType).toBe(Node.TEXT_NODE);
        expect(lastChild.textContent.trim()).toBe(text);
        expect(contentLayer.firstChild).toBe(contentLayer.querySelector('kirby-icon'));
      });

      it('should hide the plain text', () => {
        expect(contentLayer.lastChild).toBeHidden();
      });

      it('should render as icon only', () => {
        expect(element).toHaveClass('icon-only');
        expect(element.offsetWidth).toEqual(element.offsetHeight);
      });
    });

    describe(`and text in an element to the left of icon`, () => {
      beforeEach(() => {
        spectator = createHost(
          `<button kirby-button showIconOnly="true">
            <p>Hidden Text Left</p>
            <kirby-icon name="edit"></kirby-icon>
          </button>`
        );
        element = spectator.element as HTMLButtonElement;
        contentLayer = element.querySelector('.content-layer');
      });

      it('should NOT wrap the text in an element', () => {
        const firstChild = contentLayer.firstChild;
        expect((firstChild as HTMLElement).tagName).toBe('P');
        expect(firstChild.firstChild.nodeType).toBe(Node.TEXT_NODE);
      });

      it('should hide the text element', () => {
        expect(contentLayer.firstChild).toBeHidden();
      });

      it('should render as icon only', () => {
        expect(element).toHaveClass('icon-only');
        expect(element.offsetWidth).toEqual(element.offsetHeight);
      });
    });

    describe(`and text in an element to the right of icon`, () => {
      beforeEach(() => {
        spectator = createHost(
          `<button kirby-button showIconOnly="true">
        <kirby-icon name="edit"></kirby-icon>
        <p>Hidden Text Right</p>
      </button>`
        );
        element = spectator.element as HTMLButtonElement;
        contentLayer = element.querySelector('.content-layer');
      });

      it('should NOT wrap the text in an element', () => {
        const lastChild = contentLayer.lastChild;
        expect((lastChild as HTMLElement).tagName).toBe('P');
        expect(lastChild.firstChild.nodeType).toBe(Node.TEXT_NODE);
      });

      it('should hide the text element', () => {
        expect(contentLayer.lastChild).toBeHidden();
      });

      it('should render as icon only', () => {
        expect(element).toHaveClass('icon-only');
        expect(element.offsetWidth).toEqual(element.offsetHeight);
      });
    });

    describe(`when no icon present`, () => {
      describe(`and plain text`, () => {
        it('should NOT wrap the text in an element', () => {
          spectator = createHost(
            `<button kirby-button showIconOnly="true">
              Not Hidden Text
            </button>`
          );
          element = spectator.element as HTMLButtonElement;
          contentLayer = element.querySelector('.content-layer');
          expect(contentLayer.firstChild.nodeType).toBe(Node.TEXT_NODE);
        });
      });

      describe(`and text in an element`, () => {
        it('should NOT hide the text element', () => {
          spectator = createHost(
            `<button kirby-button showIconOnly="true">
              <p>Not Hidden Text</p>
            </button>`
          );
          element = spectator.element as HTMLButtonElement;
          contentLayer = element.querySelector('.content-layer');
          expect(contentLayer.firstChild).toBeVisible();
        });
      });
    });

    describe(`when showIconOnly=true is set after initial rendering`, () => {
      describe(`and plain text to the left of icon`, () => {
        it('should NOT apply `icon-right` class', () => {
          spectator = createHost(
            `<button kirby-button>
              Hidden Text Left
              <kirby-icon name="edit"></kirby-icon>
            </button>`
          );
          spectator.setInput('showIconOnly', true);
          element = spectator.element as HTMLButtonElement;
          expect(element).not.toHaveClass('icon-right');
        });
      });

      describe(`and plain text to the right of icon`, () => {
        it('should NOT apply `icon-left` class', () => {
          spectator = createHost(
            `<button kirby-button>
              <kirby-icon name="edit"></kirby-icon>
              Hidden Text Right
            </button>`
          );
          spectator.setInput('showIconOnly', true);
          element = spectator.element as HTMLButtonElement;
          expect(element).not.toHaveClass('icon-left');
        });
      });
    });
  });
});
