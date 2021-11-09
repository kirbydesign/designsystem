import { createHostFactory, SpectatorHost } from '@ngneat/spectator';
import { MockComponent } from 'ng-mocks';

import { DesignTokenHelper } from '../../helpers/design-token-helper';
import { IconComponent } from '../icon/icon.component';

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

    it('should render with transparent border', () => {
      expect(element).toHaveComputedStyle({
        'border-width': '1px',
        'border-style': 'solid',
        'border-color': 'transparent',
      });
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

      it('should render with transparent border', () => {
        expect(element).toHaveComputedStyle({
          'border-width': '1px',
          'border-style': 'solid',
          'border-color': 'transparent',
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

      it('should render with transparent border', () => {
        expect(element).toHaveComputedStyle({
          'border-width': '1px',
          'border-style': 'solid',
          'border-color': 'transparent',
        });
      });

      describe('and is destructive', () => {
        beforeEach(() => {
          spectator.component.isDestructive = true;
          spectator.detectChanges();
        });

        it('should render with correct background-color', () => {
          expect(element).toHaveComputedStyle({
            'background-color': getColor('danger'),
          });
        });

        it('should render with correct color', () => {
          expect(element).toHaveComputedStyle({
            color: getColor('danger', 'contrast'),
          });
        });

        it('should render with transparent border', () => {
          expect(element).toHaveComputedStyle({
            'border-width': '1px',
            'border-style': 'solid',
            'border-color': 'transparent',
          });
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
          'background-color': getColor('white'),
        });
      });

      it('should render with correct color', () => {
        expect(element).toHaveComputedStyle({
          color: getColor('white', 'contrast'),
        });
      });

      it('should render with transparent border', () => {
        expect(element).toHaveComputedStyle({
          'border-width': '1px',
          'border-style': 'solid',
          'border-color': 'transparent',
        });
      });

      describe('and is destructive', () => {
        beforeEach(() => {
          spectator.component.isDestructive = true;
          spectator.detectChanges();
        });

        it('should render with correct background-color', () => {
          expect(element).toHaveComputedStyle({
            'background-color': getColor('light'),
          });
        });

        it('should render with correct color', () => {
          expect(element).toHaveComputedStyle({
            color: getColor('danger'),
          });
        });

        it('should render with transparent border', () => {
          expect(element).toHaveComputedStyle({
            'border-width': '1px',
            'border-style': 'solid',
            'border-color': 'transparent',
          });
        });
      });
    });

    describe('when configured with attentionlevel 3', () => {
      beforeEach(() => {
        spectator.component.attentionLevel = '3';
        spectator.detectChanges();
      });

      it('should render with no background-color', () => {
        expect(element).toHaveComputedStyle({ 'background-color': 'transparent' });
      });

      it('should render with correct border', () => {
        expect(element).toHaveComputedStyle({
          'border-color': getColor('medium'),
          'border-width': '1px',
          'border-style': 'solid',
        });
      });

      it('should render with correct color', () => {
        expect(element).toHaveComputedStyle({
          color: getColor('black'),
        });
      });

      describe('and is destructive', () => {
        beforeEach(() => {
          spectator.component.isDestructive = true;
          spectator.detectChanges();
        });

        it('should render with correct background-color', () => {
          expect(element).toHaveComputedStyle({ 'background-color': 'transparent' });
        });

        it('should render with correct border-color', () => {
          expect(element).toHaveComputedStyle({
            'border-color': getColor('medium'),
          });
        });

        it('should render with correct color', () => {
          expect(element).toHaveComputedStyle({
            color: getColor('danger'),
          });
        });
      });

      describe('and is disabled', () => {
        beforeEach(() => {
          element.disabled = true;
        });

        it('should render with transparent border', () => {
          expect(element).toHaveComputedStyle({
            'border-width': '1px',
            'border-style': 'solid',
            'border-color': 'transparent',
          });
        });
      });
    });

    describe('when configured with attentionlevel 4', () => {
      beforeEach(() => {
        spectator.component.attentionLevel = '4';
        spectator.detectChanges();
      });

      it('should render with no background-color', () => {
        expect(element).toHaveComputedStyle({ 'background-color': 'transparent' });
      });

      it('should render with transparent border', () => {
        expect(element).toHaveComputedStyle({
          'border-width': '1px',
          'border-style': 'solid',
          'border-color': 'transparent',
        });
      });

      it('should render with correct color', () => {
        expect(element).toHaveComputedStyle({
          color: getColor('black'),
        });
      });

      describe('and is destructive', () => {
        beforeEach(() => {
          spectator.component.isDestructive = true;
          spectator.detectChanges();
        });

        it('should render with no background-color', () => {
          expect(element).toHaveComputedStyle({ 'background-color': 'transparent' });
        });

        it('should render with transparent border', () => {
          expect(element).toHaveComputedStyle({
            'border-width': '1px',
            'border-style': 'solid',
            'border-color': 'transparent',
          });
        });

        it('should render with correct color', () => {
          expect(element).toHaveComputedStyle({ color: getColor('danger') });
        });
      });
    });
  });

  const testScenarios: { size: ButtonSize; expected: any }[] = [
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
  testScenarios.forEach((scenario) => {
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
});
