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

    describe('when configured with attentionlevel 4', () => {
      beforeEach(() => {
        spectator.component.attentionLevel = '4';
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

    describe('when configured with no decoration', () => {
      beforeEach(() => {
        spectator.component.noDecoration = true;
        spectator.detectChanges();
      });

      it('should render with no background-color', () => {
        expect(element).toHaveComputedStyle({ 'background-color': 'transparent' });
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
    leftXS: { paddingInline: '4px 12px' },
    rightXS: { paddingInline: '12px 4px' },
    left: { paddingInline: '12px 16px' },
    right: { paddingInline: '16px 12px' },
  };

  const iconTestScenarios: {
    size: ButtonSize;
    iconPosition: 'left' | 'right';
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
      size: ButtonSize.LG,
      iconPosition: 'left',
      expected: iconTestExpectations.left,
    },
    {
      size: ButtonSize.LG,
      iconPosition: 'right',
      expected: iconTestExpectations.right,
    },
  ];
  iconTestScenarios.forEach((scenario) => {
    describe(`when configured with size = ${scenario.size} & used with kirby-icon`, () => {
      describe(`through one-time string initialization`, () => {
        beforeEach(() => {
          spectator = createHost(
            `<button kirby-button size="${scenario.size}">
              ${scenario.iconPosition === 'left' ? '<kirby-icon name="edit"></kirby-icon>' : ''}
              <span>Text</span>
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
      });

      describe(`through an input property`, () => {
        beforeEach(() => {
          spectator = createHost(
            `<button kirby-button>
              ${scenario.iconPosition === 'left' ? '<kirby-icon name="edit"></kirby-icon>' : ''}
              <span>Text</span>
              ${scenario.iconPosition === 'right' ? '<kirby-icon name="edit"></kirby-icon>' : ''}
            </button>`,
            {
              props: {
                size: scenario.size,
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
      });

      describe(`through template property binding`, () => {
        beforeEach(() => {
          spectator = createHost(
            `<button kirby-button [size]="'${scenario.size}'">
              ${scenario.iconPosition === 'left' ? '<kirby-icon name="edit"></kirby-icon>' : ''}
              <span>Text</span>
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
      });
    });
  });
});
