import { IonicModule } from '@ionic/angular';
import { PlatformService } from '@kirbydesign/designsystem/helpers';
import { createHostFactory, SpectatorHost } from '@ngneat/spectator';
import { ListItemSwipeComponent } from '../list-item-swipe/list-item-swipe.component';
import { ListItem, ListItemComponent } from './list-item.component';

describe('ListItemComponent', () => {
  const mockPaltformServiceIsDesktop = {
    isTouch: () => false,
    isTablet: () => false,
  };

  const createHost = createHostFactory({
    component: ListItemComponent,
    declarations: [
      ListItemComponent,
      {
        provide: ListItemSwipeComponent,
        useValue: {
          boundaryClass: 'boundary-class',
          swipeActions: [],
          item: {},
          itemTemplate: null,
          isSelected: false,
          isSelectable: false,
          getItemColor: () => 'default',
          itemSelect: () => {},
          swipeActionSelect: () => {},
        },
      },
    ],
    imports: [IonicModule.forRoot()],
    providers: [{ provide: PlatformService, useValue: mockPaltformServiceIsDesktop }],
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
      expect(spectatorDesktop.component.device).toEqual('desktop');
      spectatorDesktop.detectChanges();
      expect(spectatorDesktop.query('kirby-list-item-menu')).toBeTruthy();
    });
  });

  describe(`device is 'touch'`, () => {
    let spectatorMobile: SpectatorHost<ListItemComponent>;

    beforeEach(async () => {
      const mockPaltformServiceIsTouch = {
        isTouch: () => true,
        isTablet: () => false,
      };
      spectatorMobile = createHost(`<kirby-list-item></kirby-list-item>`, {
        props: { item },
        providers: [{ provide: PlatformService, useValue: mockPaltformServiceIsTouch }],
      });
    });

    it(`should set device to mobile & instantiate 'kirby-list-item-swipe'`, () => {
      expect(spectatorMobile.component.device).toEqual('mobile');
      spectatorMobile.detectChanges();
      expect(spectatorMobile.query('kirby-list-item-swipe')).toBeTruthy();
    });
  });
});
