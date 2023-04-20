import { IonicModule } from '@ionic/angular';
import { createHostFactory, SpectatorHost } from '@ngneat/spectator';
import { MockModule } from 'ng-mocks';

import { DesignTokenHelper } from '@kirbydesign/designsystem/helpers';

import { IconModule } from '@kirbydesign/designsystem/icon';

import { ItemComponent, ItemSize } from './item.component';

const { itemHeight, size } = DesignTokenHelper;

describe('ItemComponent', () => {
  let spectator: SpectatorHost<ItemComponent>;

  const createHost = createHostFactory({
    imports: [MockModule(IonicModule), MockModule(IconModule)],
    component: ItemComponent,
  });

  beforeEach(() => {
    spectator = createHost('<kirby-item>Value</kirby-item>');
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should have size md as default', () => {
    expect(spectator.query('ion-item')).toHaveComputedStyle({
      '--min-height': itemHeight('m'),
    });
  });

  describe('when configured with size', () => {
    describe('and size = xs', () => {
      it('should have correct item height and padding', () => {
        spectator.component.size = ItemSize.XS;
        spectator.detectChanges();

        expect(spectator.query('ion-item')).toHaveComputedStyle({
          '--min-height': itemHeight('xs'),
          '--inner-padding-top': size('xxxs'),
          '--inner-padding-bottom': size('xxxs'),
        });
      });
    });

    describe('and size = sm', () => {
      it('should have correct item height', () => {
        spectator.component.size = ItemSize.SM;
        spectator.detectChanges();

        expect(spectator.query('ion-item')).toHaveComputedStyle({
          '--min-height': itemHeight('s'),
        });
      });
    });

    describe('and size = md', () => {
      it('should have correct item height', () => {
        spectator.component.size = ItemSize.MD;
        spectator.detectChanges();

        expect(spectator.query('ion-item')).toHaveComputedStyle({
          '--min-height': itemHeight('m'),
        });
      });
    });
  });

  describe('when --item-padding-top css custom property is set', () => {
    it('should set correct --padding-top css custom property', () => {
      spectator.element.style.setProperty('--item-padding-top', '8px');
      expect(spectator.query('ion-item')).toHaveComputedStyle({ '--padding-top': size('xxs') });
    });
  });

  describe('when --item-padding-bottom css custom property is set', () => {
    it('should set correct --padding-bottom css custom property', () => {
      spectator.element.style.setProperty('--item-padding-bottom', '8px');
      expect(spectator.query('ion-item')).toHaveComputedStyle({ '--padding-bottom': size('xxs') });
    });
  });

  describe('when disclosure is set to something valid', () => {
    it('should set inner-padding-end to xxs', () => {
      spectator.component.disclosure = 'arrow-more';
      spectator.detectChanges();

      expect(spectator.query('ion-item')).toHaveComputedStyle({
        '--inner-padding-end': size('xxs'),
      });
    });
  });

  describe('when disclosure is reset to null', () => {
    it('should reset inner-padding-end to s', () => {
      spectator.component.disclosure = 'arrow-more';
      spectator.detectChanges();

      expect(spectator.query('ion-item')).toHaveComputedStyle({
        '--inner-padding-end': size('xxs'),
      });

      spectator.component.disclosure = null;
      spectator.detectChanges();

      expect(spectator.query('ion-item')).toHaveComputedStyle({
        '--inner-padding-end': size('s'),
      });
    });
  });

  describe('disabled', () => {
    it('should not have computed style "pointer:none" by default', () => {
      expect(spectator.element).not.toHaveComputedStyle({ 'pointer-events': 'none' });
    });

    it(`should have computed style 'pointer:none' when having '[disabled]="true"'`, () => {
      spectator.component.disabled = true;
      spectator.detectChanges();

      expect(spectator.element).toHaveComputedStyle({ 'pointer-events': 'none' });
    });

    it(`should not have computed style "pointer:none" when having '[disabled]="false"`, () => {
      spectator.component.disabled = false;
      spectator.detectChanges();

      expect(spectator.element).not.toHaveComputedStyle({ 'pointer-events': 'none' });
    });

    it('should not have computed style "pointer:none" when not having "[disabled]" input defined', () => {
      spectator.component.disabled = undefined;
      spectator.detectChanges();

      expect(spectator.element).not.toHaveComputedStyle({ 'pointer-events': 'none' });
    });

    it('should have computed style "pointer:none" when having disabled attribute', () => {
      spectator.element.setAttribute('disabled', '');
      spectator.detectChanges();

      expect(spectator.element).toHaveComputedStyle({ 'pointer-events': 'none' });
    });
  });

  xdescribe('when device is desktop', () => {
    it('should have a menu button', () => {});
  });
});
