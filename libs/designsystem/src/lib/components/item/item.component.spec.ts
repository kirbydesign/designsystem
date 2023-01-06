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
});
