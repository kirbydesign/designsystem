import { IonicModule } from '@ionic/angular';
import { createHostFactory, SpectatorHost } from '@ngneat/spectator';
import { MockModule } from 'ng-mocks';

import { DesignTokenHelper } from '../../helpers/design-token-helper';
import { IconModule } from '../icon/icon.module';

import { ItemComponent } from './item.component';

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
        spectator.component.size = 'xs';
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
        spectator.component.size = 'sm';
        spectator.detectChanges();

        expect(spectator.query('ion-item')).toHaveComputedStyle({
          '--min-height': itemHeight('s'),
        });
      });
    });

    describe('and size = md', () => {
      it('should have correct item height', () => {
        spectator.component.size = 'md';
        spectator.detectChanges();

        expect(spectator.query('ion-item')).toHaveComputedStyle({
          '--min-height': itemHeight('m'),
        });
      });
    });
  });
});
