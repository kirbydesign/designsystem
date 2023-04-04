import { IonicModule } from '@ionic/angular';
import { createHostFactory, SpectatorHost } from '@ngneat/spectator';
import { MockComponent } from 'ng-mocks';

import { DesignTokenHelper, PlatformService } from '@kirbydesign/designsystem/helpers';
import { ItemComponent } from '@kirbydesign/designsystem/item';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ListSwipeAction } from '../list-swipe-action.type';
import { ListComponent } from '../list.component';
import { ListModule } from '../list.module';
import { ListItemComponent } from './list-item.component';
import { ListItemSwipeComponent } from './list-item-swipe/list-item-swipe.component';
import { ListItemMenuComponent } from './list-item-menu/list-item-menu.component';

const getColor = DesignTokenHelper.getColor;

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

  const defaultSwipeAction: ListSwipeAction = {
    position: 'left',
    title: 'Archive',
    type: 'warning',
    onSelected: (item) => null,
    isDisabled: (_item: any) => false,
  };

  describe(`device is 'desktop'`, () => {
    let spectatorDesktop: SpectatorHost<ListItemComponent>;

    beforeEach(async () => {
      spectatorDesktop = createHost(`<kirby-list-item></kirby-list-item>`, {
        props: {
          item,
          device: 'desktop',
          swipeActions: [defaultSwipeAction, { ...defaultSwipeAction, title: 'TestAction' }],
        },
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
        props: {
          item,
          device: 'touch',
          swipeActions: [defaultSwipeAction, { ...defaultSwipeAction, title: 'TestAction' }],
        },
      });
    });

    it(`should set device to mobile & instantiate 'kirby-list-item-swipe'`, () => {
      expect(spectatorMobile.component.device).toEqual('touch');
      expect(spectatorMobile.query('kirby-list-item-swipe')).toBeTruthy();
      expect(spectatorMobile.query('kirby-list-item-menu')).toBeFalsy();
    });
  });

  describe(`when there is '0' actions`, () => {
    let spectatorNoActions: SpectatorHost<ListItemComponent>;

    beforeEach(async () => {
      spectatorNoActions = createHost(`<kirby-list-item></kirby-list-item>`, {
        props: {
          item,
          swipeActions: [],
        },
      });
    });

    it(`should not instantiate 'kirby-list-item-swipe' or 'kirby-list-item-menu'`, () => {
      expect(spectatorNoActions.query('kirby-list-item-swipe')).toBeFalsy();
      expect(spectatorNoActions.query('kirby-list-item-menu')).toBeFalsy();

      const noActions = spectatorNoActions.query('.list-item--no-action');
      expect(noActions).toBeTruthy();
    });
  });

  describe('dividers', () => {
    const createHost = createHostFactory({
      component: ListComponent,
      declarations: [MockComponent(ItemComponent)],
      imports: [ListModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });

    describe('when no swipe actions are defined', () => {
      let noActionsSpectator;

      beforeEach(async () => {
        noActionsSpectator = createHost(
          `
          <kirby-list (itemSelect)="($event)">
            <kirby-item *kirbyListItemTemplate="let item">
             <h3 slot="outside">{{ item.name }}</h3>
            </kirby-item>
          </kirby-list>
          `,
          {
            props: {
              items: [{ name: 'Item1' }, { name: 'Item3' }, { name: 'Item3' }],
            },
          }
        );
      });

      it('should have 3 items', async () => {
        const kirbyItems = noActionsSpectator.queryAll('kirby-item');

        expect(kirbyItems).toHaveLength(3);
      });

      it('should have divider between items 1,2 & 2,3', () => {
        const [kirbyListItemTop, kirbyListItemMiddle, kirbyListItemBottom] =
          noActionsSpectator.queryAll('kirby-list-item');

        const dividerComputedStyle = {
          'border-bottom-width': '1px',
          'border-bottom-style': 'solid',
          'border-bottom-color': getColor('background-color'),
        };

        expect(kirbyListItemTop).toHaveComputedStyle(dividerComputedStyle);
        expect(kirbyListItemMiddle).toHaveComputedStyle(dividerComputedStyle);
        expect(kirbyListItemBottom).not.toHaveComputedStyle(dividerComputedStyle);
      });
    });
  });
});
