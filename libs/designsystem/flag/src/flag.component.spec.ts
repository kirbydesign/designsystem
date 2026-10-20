import { DesignTokenHelper } from '@kirbydesign/designsystem/helpers';
import { createHostFactory, SpectatorHost } from '@ngneat/spectator';

import { FlagComponent } from './flag.component';

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

  it('should render with correct border', () => {
    expect(element).toHaveComputedStyle({
      'border-width': '1px',
      'border-style': 'solid',
    });
  });

  it('should render with correct border-radius', () => {
    expect(element).toHaveComputedStyle({ 'border-radius': '4px' });
  });

  it('should render with correct font-size', () => {
    expect(element).toHaveComputedStyle({ 'font-size': fontSize('n') });
  });

  it('should render with correct font-weight', () => {
    expect(element).toHaveComputedStyle({ 'font-weight': fontWeight('medium') });
  });

  it('should render with correct padding', () => {
    expect(element).toHaveComputedStyle({
      'padding-left': size('xxs'),
      'padding-right': size('xxs'),
      'padding-top': '5px',
      'padding-bottom': '5px',
    });
  });

  describe('when configured with size', () => {
    describe('and size = xs', () => {
      beforeEach(() => {
        spectator.component.size = 'xs';
        spectator.detectChanges();
      });

      it('should render with correct font-size', () => {
        expect(element).toHaveComputedStyle({ 'font-size': fontSize('xs') });
      });

      it('should render with correct padding', () => {
        expect(element).toHaveComputedStyle({
          'padding-left': size('xxxs'),
          'padding-right': size('xxxs'),
          'padding-top': '3px',
          'padding-bottom': '3px',
        });
      });
    });

    describe('and size = sm', () => {
      beforeEach(() => {
        spectator.component.size = 'sm';
        spectator.detectChanges();
      });

      it('should render with correct font-size', () => {
        expect(element).toHaveComputedStyle({ 'font-size': fontSize('s') });
      });

      it('should render with correct padding', () => {
        expect(element).toHaveComputedStyle({
          'padding-left': size('xxs'),
          'padding-right': size('xxs'),
          'padding-top': '4px',
          'padding-bottom': '4px',
        });
      });
    });
  });
});
