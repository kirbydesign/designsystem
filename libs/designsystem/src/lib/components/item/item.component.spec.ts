import { IonicModule } from '@ionic/angular';
import { createHostFactory, SpectatorHost } from '@ngneat/spectator';
import { MockModule } from 'ng-mocks';

import { DesignTokenHelper } from '../../helpers/design-token-helper';
import { IconModule } from '../icon/icon.module';

import { ItemComponent } from './item.component';

const itemHeight = DesignTokenHelper.itemHeight;
const size = DesignTokenHelper.size;

describe('ItemComponent', () => {
  let spectator: SpectatorHost<ItemComponent>;
  let element: HTMLElement;

  const createHost = createHostFactory({
    imports: [MockModule(IonicModule), MockModule(IconModule)],
    component: ItemComponent,
  });

  beforeEach(() => {
    spectator = createHost('<kirby-item>Value</kirby-item>');
    element = spectator.element as HTMLElement;
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should have size md as default', () => {
    expect(element.querySelector('ion-item')).toHaveComputedStyle({
      '--min-height': itemHeight('m'),
    });
  });

  describe('when configured with size', () => {
    describe('and size = xs', () => {
      beforeEach(() => {
        spectator.component.size = 'xs';
        spectator.detectChanges();
      });

      it('should have correct item height and padding', () => {
        expect(element.querySelector('ion-item')).toHaveComputedStyle({
          '--min-height': itemHeight('xs'),
          '--inner-padding-top': size('xxxs'),
          '--inner-padding-bottom': size('xxxs'),
        });
      });
    });

    describe('and size = sm', () => {
      beforeEach(() => {
        spectator.component.size = 'sm';
        spectator.detectChanges();
      });

      it('should have correct item height', () => {
        expect(element.querySelector('ion-item')).toHaveComputedStyle({
          '--min-height': itemHeight('s'),
        });
      });
    });

    describe('and size = md', () => {
      beforeEach(() => {
        spectator.component.size = 'md';
        spectator.detectChanges();
      });

      it('should have correct item height', () => {
        expect(element.querySelector('ion-item')).toHaveComputedStyle({
          '--min-height': itemHeight('m'),
        });
      });
    });
  });
});
