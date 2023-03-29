import { IonicModule } from '@ionic/angular';
import { createHostFactory, SpectatorHost } from '@ngneat/spectator';
import { MockComponent } from 'ng-mocks';

import { PlatformService } from '@kirbydesign/designsystem/helpers';
import { ListItemComponent } from './list-item.component';
import { ListItemSwipeComponent } from './list-item-swipe/list-item-swipe.component';
import { ListItemMenuComponent } from './list-item-menu/list-item-menu.component';

describe('ListItemComponent', () => {
  const mockPlatformServiceIsTouchFalse = {
    isTouch: () => false,
    isTablet: () => false,
  };

  const createHost = createHostFactory({
    component: ListItemComponent,
    declarations: [
      ListItemComponent,
      MockComponent(ListItemSwipeComponent),
      MockComponent(ListItemMenuComponent),
    ],
    imports: [IonicModule.forRoot()],
    providers: [{ provide: PlatformService, useValue: mockPlatformServiceIsTouchFalse }],
  });

  const item: any = {
    id: 0,
    title: 'Vestas Wind Systems',
    subTitle: '2000 pcs',
    amount: '5.587.218.309 DKK',
    detail: 225,
    flagged: false,
    color: 'default',
  };

  describe(`device is 'desktop'`, () => {
    let spectatorDesktop: SpectatorHost<ListItemComponent>;

    beforeEach(async () => {
      spectatorDesktop = createHost(`<kirby-list-item></kirby-list-item>`, {
        props: { item, device: 'desktop' },
      });
    });

    it('should create', () => {
      expect(spectatorDesktop.component).toBeTruthy();
    });

    it(`should set device to desktop & instantiate 'kirby-list-item-menu'`, () => {
      expect(spectatorDesktop.component.device).toEqual('desktop');
      expect(spectatorDesktop.query('kirby-list-item-menu')).toBeTruthy();
      expect(spectatorDesktop.query('kirby-list-item-swipe')).toBeFalsy();
    });
  });

  describe(`device is 'touch'`, () => {
    let spectatorMobile: SpectatorHost<ListItemComponent>;

    beforeEach(async () => {
      spectatorMobile = createHost(`<kirby-list-item></kirby-list-item>`, {
        props: { item, device: 'touch' },
      });
    });

    it(`should set device to mobile & instantiate 'kirby-list-item-swipe'`, () => {
      expect(spectatorMobile.component.device).toEqual('touch');
      expect(spectatorMobile.query('kirby-list-item-swipe')).toBeTruthy();
      expect(spectatorMobile.query('kirby-list-item-menu')).toBeFalsy();
    });
  });
});
