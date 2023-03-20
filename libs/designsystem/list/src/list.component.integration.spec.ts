import { createHostFactory, SpectatorHost } from '@ngneat/spectator';

import { DesignTokenHelper, PlatformService } from '@kirbydesign/designsystem/helpers';

import { WindowRef } from '@kirbydesign/designsystem/types';
import { TestHelper } from '@kirbydesign/designsystem/testing';
import { SpinnerModule } from '@kirbydesign/designsystem/spinner';
import { CardModule } from '@kirbydesign/designsystem/card';
import { IconComponent } from '@kirbydesign/designsystem/icon';
import { ItemComponent } from '@kirbydesign/designsystem/item';
import {
  InfiniteScrollDirective,
  ListComponent,
  ListItemColorDirective,
  ListItemTemplateDirective,
} from '..';

import { ListItemComponent } from './list-item/list-item.component';
import { ListItemMenuComponent } from './list-item-menu/list-item-menu.component';
import { HasActionsPipe } from './list-item/pipes/has-actions/has-actions.pipe';
import { GetActionIconPipe } from './list-item/pipes/get-action-icon/get-action-icon.pipe';
import { GetActionsPipe } from './list-item/pipes/get-actions/get-actions.pipe';
import { ListItemSwipeComponent } from './list-item-swipe/list-item-swipe.component';

const { fontWeight, size } = DesignTokenHelper;

describe('ListComponent', () => {
  let ionList: HTMLElement;
  let itemsInList: HTMLElement[];

  let spectator: SpectatorHost<ListComponent>;

  const mockPaltformServiceIsTouchTrue = {
    isTouch: () => true,
    isTablet: () => false,
  };

  const createHost = createHostFactory({
    component: ListComponent,
    imports: [TestHelper.ionicModuleForTest, CardModule, SpinnerModule],
    providers: [
      {
        provide: WindowRef,
        useValue: <WindowRef>{ nativeWindow: window },
      },
    ],
    declarations: [
      ItemComponent,
      IconComponent,
      InfiniteScrollDirective,
      ListItemColorDirective,
      ListItemTemplateDirective,
      ListItemComponent,
      ListItemMenuComponent,
      ListItemSwipeComponent,
      HasActionsPipe,
      GetActionsPipe,
      GetActionIconPipe,
    ],
  });

  describe(`with kirby-item, when device is 'touch'`, () => {
    let itemTexts: HTMLElement[];

    beforeEach(async () => {
      spectator = createHost<ListComponent>(
        `
        <kirby-list [items]="[{ name: 'Item1' }, { name: 'Item2' }, { name: 'Item3' }]" (itemSelect)="($event)">
          <kirby-item *kirbyListItemTemplate="let item"><h3>{{ item.name }}</h3></kirby-item>
        </kirby-list>,
        `,
        { providers: [{ provide: PlatformService, useValue: mockPaltformServiceIsTouchTrue }] }
      );
      ionList = spectator.queryHost('ion-list');
      await TestHelper.whenReady(ionList);
      itemsInList = spectator.queryAll('ion-list ion-item');
      itemTexts = spectator.queryAll('ion-list ion-item h3');
    });

    it('should create list wrapper', () => {
      expect(spectator.component).toBeTruthy();
    });

    it('should render items in list', () => {
      expect(itemsInList).not.toBeEmpty();
      itemsInList.forEach((item) => {
        expect(item.shadowRoot.hasChildNodes()).toBeTrue();
      });
    });

    it('should highlight selected item in bold text', () => {
      const selectItem = itemsInList[1];
      spectator.click(selectItem);

      for (let i = 0; i < itemTexts.length; i++) {
        const fontWeightExpected = itemsInList[i] === selectItem ? 'bold' : 'normal';
        expect(itemTexts[i]).toHaveComputedStyle({ 'font-weight': fontWeight(fontWeightExpected) });
      }
    });

    it('should not highlight selected item in bold text on disableSelectionHighlight', () => {
      spectator.setInput('disableSelectionHighlight', true);
      spectator.detectChanges();

      const selectItem = itemsInList[1];
      spectator.click(selectItem);

      for (let i = 0; i < itemTexts.length; i++) {
        expect(itemTexts[i]).toHaveComputedStyle({ 'font-weight': fontWeight('normal') });
      }
    });

    describe('with hasItemSpacing set to true', () => {
      it('should apply spacing to all but the last item', () => {
        spectator.setInput('hasItemSpacing', true);
        spectator.detectChanges();
        const kirbyItemsInList = spectator.queryAll('kirby-list-item:not(:last-child)');

        expect(kirbyItemsInList).not.toBeEmpty();
        kirbyItemsInList.forEach((item) => {
          expect(item).toHaveComputedStyle({ 'margin-bottom': size('s') });
        });
      });

      it('should not apply spacing to the last item', () => {
        spectator.setInput('hasItemSpacing', true);
        spectator.detectChanges();
        const kirbyItemsInList = spectator.queryAll('kirby-list-item:last-child');

        expect(kirbyItemsInList).not.toBeEmpty();
        kirbyItemsInList.forEach((item) => {
          expect(item).toHaveComputedStyle({ 'margin-bottom': '0px' });
        });
      });
    });

    describe('with hasItemSpacing set to false', () => {
      it('should not apply spacing to items', () => {
        spectator.setInput('hasItemSpacing', false);
        spectator.detectChanges();
        const kirbyItemsInList = spectator.queryAll('kirby-list-item');

        expect(kirbyItemsInList).not.toBeEmpty();
        kirbyItemsInList.forEach((item) => {
          expect(item).toHaveComputedStyle({ 'margin-bottom': '0px' });
        });
      });
    });
  });

  describe('with kirby-item inside kirby-card', () => {
    beforeEach(async () => {
      spectator = createHost<ListComponent>(
        `
        <kirby-list [items]="[{ name: 'Item1' }, { name: 'Item2' }, { name: 'Item3' }]">
          <kirby-card *kirbyListItemTemplate="let item">
            <kirby-item>{{ item.name }}</kirby-item>
          </kirby-card>
        </kirby-list>
        `
      );
      ionList = spectator.queryHost('ion-list');
      await TestHelper.whenReady(ionList);
      itemsInList = spectator.queryAll('ion-list ion-item');
    });

    it('should create list wrapper', () => {
      expect(spectator.component).toBeTruthy();
    });

    it('should render items in list', () => {
      expect(itemsInList).not.toBeEmpty();
      itemsInList.forEach((item) => {
        expect(item.shadowRoot.hasChildNodes()).toBeTrue();
      });
    });

    it('should render first and last item without padding top/bottom', async () => {
      const firstItem = itemsInList[0].shadowRoot.querySelector('.item-native');
      const lastItem = itemsInList[itemsInList.length - 1].shadowRoot.querySelector('.item-native');
      expect(firstItem).toHaveComputedStyle({ 'padding-top': '0px' });
      expect(lastItem).toHaveComputedStyle({ 'padding-bottom': '0px' });
    });
  });

  describe(`when a list has 1 element and device is 'touch'`, () => {
    beforeEach(async () => {
      spectator = createHost<ListComponent>(
        `
        <kirby-list [items]="[{ name: 'Item1' }]" (itemSelect)="($event)">
          <kirby-item *kirbyListItemTemplate="let item"><h3>{{ item.name }}</h3></kirby-item>
        </kirby-list>
        `,
        { providers: [{ provide: PlatformService, useValue: mockPaltformServiceIsTouchTrue }] }
      );
    });
    it(`should apply the CSS class 'first' and 'last' on the first and only element in the list`, () => {
      spectator.detectChanges();
      const list = spectator.queryAll('ion-item-sliding');

      expect(list.length).toBe(1);
      const [listItem] = list;

      expect(listItem.classList).toContain('first');
      expect(listItem.classList).toContain('last');
    });
  });

  describe(`when a list has 2 elements and device is 'touch'`, () => {
    beforeEach(async () => {
      spectator = createHost<ListComponent>(
        `
          <kirby-list [items]="[{ name: 'Item1' }, { name: 'Item2' }]" (itemSelect)="($event)">
            <kirby-item *kirbyListItemTemplate="let item"><h3>{{ item.name }}</h3></kirby-item>
          </kirby-list>
          `,
        { providers: [{ provide: PlatformService, useValue: mockPaltformServiceIsTouchTrue }] }
        // { providers: [{ provide: PlatformService, useValue: mockPaltformServiceIsTouchTrue }] }
      );
    });
    it(`should apply the CSS class 'first' on the first element`, () => {
      const list = spectator.queryAll('ion-item-sliding');

      expect(list.length).toBe(2);

      //First element
      expect(list[0].classList).toContain('first');
      expect(list[0].classList).not.toContain('last');
    });

    it(`should apply the CSS class'last' on last element`, () => {
      const list = spectator.queryAll('ion-item-sliding');

      expect(list.length).toBe(2);

      //Last element
      expect(list[1].classList).toContain('last');
      expect(list[1].classList).not.toContain('first');
    });
  });

  describe(`when a list has 3 elements and device is 'touch'`, () => {
    beforeEach(async () => {
      spectator = createHost<ListComponent>(
        `
          <kirby-list [items]="[{ name: 'Item1' }, { name: 'Item2' }, { name: 'Item3' }]" (itemSelect)="($event)">
            <kirby-item *kirbyListItemTemplate="let item"><h3>{{ item.name }}</h3></kirby-item>
          </kirby-list>
          `,
        { providers: [{ provide: PlatformService, useValue: mockPaltformServiceIsTouchTrue }] }
      );
    });

    it(`should apply the CSS class 'first' on the first element`, () => {
      const list = spectator.queryAll('ion-item-sliding');

      expect(list.length).toBe(3);

      //First element
      expect(list[0].classList).toContain('first');
      expect(list[0].classList).not.toContain('last');
    });
    it(`should neither apply 'first' or 'last' on the element(s) between first and last`, () => {
      const list = spectator.queryAll('ion-item-sliding');

      expect(list.length).toBe(3);

      //middle element
      expect(list[1].classList).not.toContain('first');
      expect(list[1].classList).not.toContain('last');
    });

    it(`should apply 'last' on last element`, () => {
      const list = spectator.queryAll('ion-item-sliding');

      expect(list.length).toBe(3);

      //Last element
      expect(list[2].classList).toContain('last');
      expect(list[2].classList).not.toContain('first');
    });
  });
});
