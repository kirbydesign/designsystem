import { DesignTokenHelper } from '@kirbydesign/designsystem/helpers';
import { createHostFactory, SpectatorHost } from '@ngneat/spectator';

import { FlagComponent } from './flag.component';

const getColor = DesignTokenHelper.getColor;
const getDecorationColor = DesignTokenHelper.getDecorationColor;
const size = DesignTokenHelper.size;
const fontSize = DesignTokenHelper.fontSize;
const fontWeight = DesignTokenHelper.fontWeight;

describe('FlagComponent', () => {
  let spectator: SpectatorHost<FlagComponent>;
  let element: HTMLElement;

  const createHost = createHostFactory({
    component: FlagComponent,
  });

  beforeEach(() => {
    spectator = createHost('<kirby-flag>Value</kirby-flag>');
    element = spectator.element as HTMLElement;
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should render with correct display', () => {
    expect(element).toHaveComputedStyle({
      display: 'inline-block',
    });
  });

  it('should render with transparent background-color', () => {
    expect(element).toHaveComputedStyle({
      'background-color': 'transparent',
    });
  });

  it('should render with correct color', () => {
    expect(element).toHaveComputedStyle({ color: getColor('white', 'contrast') });
  });

  it('should render with correct border', () => {
    expect(element).toHaveComputedStyle({
      'border-color': getColor('medium'),
      'border-width': '1px',
      'border-style': 'solid',
    });
  });

  it('should render with correct border-radius', () => {
    expect(element).toHaveComputedStyle({ 'border-radius': '4px' });
  });

  // FIXME: Refactor typography test
  xit('should render with correct font-size', () => {
    expect(element).toHaveComputedStyle({ 'font-size': fontSize('n') });
  });

  it('should render with correct font-weight', () => {
    expect(element).toHaveComputedStyle({ 'font-weight': fontWeight('medium') });
  });

  it('should render with correct padding', () => {
    expect(element).toHaveComputedStyle({
      'padding-left': size('xxs'),
      'padding-right': size('xxs'),
      'padding-top': size('xxxxs'),
      'padding-bottom': size('xxxxs'),
    });
  });

  describe('when configured with size', () => {
    describe('and size = xs', () => {
      beforeEach(() => {
        spectator.component.size = 'xs';
        spectator.detectChanges();
      });

      // FIXME: Refactor typography test
      xit('should render with correct font-size', () => {
        expect(element).toHaveComputedStyle({ 'font-size': fontSize('xs') });
      });

      it('should render with correct padding', () => {
        expect(element).toHaveComputedStyle({
          'padding-left': size('xxxs'),
          'padding-right': size('xxxs'),
          'padding-top': size('xxxxs'),
          'padding-bottom': size('xxxxs'),
        });
      });
    });

    describe('and size = sm', () => {
      beforeEach(() => {
        spectator.component.size = 'sm';
        spectator.detectChanges();
      });

      // FIXME: Refactor typography test
      xit('should render with correct font-size', () => {
        expect(element).toHaveComputedStyle({ 'font-size': fontSize('s') });
      });

      it('should render with correct padding', () => {
        expect(element).toHaveComputedStyle({
          'padding-left': size('xxs'),
          'padding-right': size('xxs'),
          'padding-top': size('xxxxs'),
          'padding-bottom': size('xxxxs'),
        });
      });
    });
  });

  describe(`when configured with themeColor`, () => {
    const allowedThemeColors = ['success', 'warning', 'danger', 'semi-light'] as const;
    type FlagThemeColor = typeof allowedThemeColors[number];
    type ColorStep = [string, number];

    const themeColorMap = new Map<FlagThemeColor, ColorStep | 'semi-light'>([
      ['success', ['green', 30]],
      ['warning', ['yellow', 30]],
      ['danger', ['red', 30]],
      ['semi-light', 'semi-light'],
    ]);

    themeColorMap.forEach((color, themeColor) => {
      it(`should render with correct colors when themeColor = '${themeColor}'`, () => {
        spectator.component.themeColor = themeColor;
        spectator.detectChanges();

        const expectedBgColor = Array.isArray(color)
          ? getDecorationColor(...color)
          : getColor(color);
        expect(element).toHaveComputedStyle({
          'background-color': expectedBgColor.value,
          color: getColor(themeColor, 'contrast'),
        });
      });
    });

    it(`should render with correct colors when themeColor = 'transparent'`, async () => {
      spectator.component.themeColor = 'transparent';
      spectator.detectChanges();

      expect(element).toHaveComputedStyle({
        'background-color': 'transparent',
        color: getColor('white', 'contrast'),
        'border-color': getColor('medium'),
        'border-width': '1px',
        'border-style': 'solid',
      });
    });
  });
});
