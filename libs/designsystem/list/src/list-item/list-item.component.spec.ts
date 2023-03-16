import { IonicModule } from '@ionic/angular';
import { PlatformService } from '@kirbydesign/designsystem/helpers';
import { createHostFactory, SpectatorHost } from '@ngneat/spectator';
import { MockComponent } from 'ng-mocks';
import { ListItemMenuComponent } from '../list-item-menu/list-item-menu.component';
import { ListItemSwipeComponent } from '../list-item-swipe/list-item-swipe.component';
import { ListItem, ListItemComponent } from './list-item.component';

fdescribe('ListItemComponent', () => {
  const mockPaltformServiceIsTouceFalse = {
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
    providers: [{ provide: PlatformService, useValue: mockPaltformServiceIsTouceFalse }],
  });

  const item: ListItem = {
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
        props: { item },
      });
    });

    it('should create', () => {
      expect(spectatorDesktop.component).toBeTruthy();
    });

    it(`should set device to desktop & instantiate 'kirby-list-item-menu'`, () => {
      spectatorDesktop.detectChanges();

      expect(spectatorDesktop.component.device).toEqual('desktop');
      expect(spectatorDesktop.query('kirby-list-item-menu')).toBeTruthy();
    });
  });

  describe(`device is 'touch'`, () => {
    let spectatorMobile: SpectatorHost<ListItemComponent>;

    beforeEach(async () => {
      const mockPaltformServiceIsTouchTrue = {
        isTouch: () => true,
        isTablet: () => false,
      };
      spectatorMobile = createHost(`<kirby-list-item></kirby-list-item>`, {
        props: { item },
        providers: [{ provide: PlatformService, useValue: mockPaltformServiceIsTouchTrue }],
      });
    });

    it(`should set device to mobile & instantiate 'kirby-list-item-swipe'`, () => {
      spectatorMobile.detectChanges();

      expect(spectatorMobile.component.device).toEqual('mobile');
      expect(spectatorMobile.query('kirby-list-item-swipe')).toBeTruthy();
    });
  });
});
