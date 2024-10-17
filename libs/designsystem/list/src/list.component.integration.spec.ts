import { createHostFactory, SpectatorHost } from '@ngneat/spectator';

import { DesignTokenHelper } from '@kirbydesign/designsystem/helpers';

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

const { fontWeight, size, getColor } = DesignTokenHelper;

describe('ListComponent', () => {
  let ionList: HTMLElement;
  let itemsInList: HTMLElement[];

  let spectator: SpectatorHost<ListComponent>;
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
    ],
  });

  describe('with kirby-item', () => {
    let itemTexts: HTMLElement[];

    beforeEach(async () => {
      spectator = createHost<ListComponent>(
        `
        <kirby-list [items]="[{ name: 'Item1' }, { name: 'Item2' }, { name: 'Item3' }]" (itemSelect)="($event)">
          <kirby-item *kirbyListItemTemplate="let item"><h3>{{ item.name }}</h3></kirby-item>
        </kirby-list>
        `
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

    describe('with shape="none"', () => {
      beforeEach(() => {
        spectator.setInput('shape', 'none');
        spectator.detectChanges();
      });
      it('should apply transparent background to kirby-list-items', () => {
        const ionItem = spectator.queryAll('ion-item');
        expect(ionItem.length).toBeGreaterThan(0);
        ionItem.forEach((item) => {
          const itemNative = item.shadowRoot.querySelector('.item-native');
          expect(itemNative).toHaveComputedStyle({ 'background-color': 'rgba(0, 0, 0, 0)' });
        });
      });
      it('should apply "medium" border color to all but last item when not in card', () => {
        const ionItemSlidingList = spectator.queryAll('ion-item-sliding');
        const lastIonItemSliding = ionItemSlidingList[ionItemSlidingList.length - 1];

        expect(ionItemSlidingList.length).toBeGreaterThan(0);
        ionItemSlidingList.forEach((item) => {
          if (item !== lastIonItemSliding) {
            expect(item).toHaveComputedStyle({ 'border-bottom-color': getColor('medium') });
          }
        });
      });
    });
  });

  describe('with list inside card and shape="none"', () => {
    beforeEach(async () => {
      spectator = createHost<ListComponent>(
        `
        <kirby-card>
          <kirby-list [items]="[{ name: 'Item1' }, { name: 'Item2' }, { name: 'Item3' }]" (itemSelect)="($event)" shape="none">
            <kirby-item *kirbyListItemTemplate="let item"><h3>{{ item.name }}</h3></kirby-item>
          </kirby-list>
        </kirby-card>
        `
      );
      ionList = spectator.queryHost('ion-list');
      await TestHelper.whenReady(ionList);
      itemsInList = spectator.queryAll('ion-list ion-item');
    });

    it('should apply "background" border color to all but last item when inside card and list has shape "none"', () => {
      const ionItemSlidingList = spectator.queryAll('ion-item-sliding');
      expect(ionItemSlidingList.length).toBeGreaterThan(0);
      const lastIonItemSliding = ionItemSlidingList[ionItemSlidingList.length - 1];
      ionItemSlidingList.forEach((item) => {
        if (item !== lastIonItemSliding) {
          expect(item).toHaveComputedStyle({
            'border-bottom-color': getColor('background-color'),
          });
        }
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

  describe('when a list have 1 element', () => {
    beforeEach(async () => {
      spectator = createHost<ListComponent>(
        `
        <kirby-list [items]="[{ name: 'Item1' }]" (itemSelect)="($event)">
          <kirby-item *kirbyListItemTemplate="let item"><h3>{{ item.name }}</h3></kirby-item>
        </kirby-list>
        `
      );
    });
    it(`should apply the CSS class 'first' and 'last' on the first and only element in the list`, () => {
      const list = spectator.queryAll('ion-item-sliding');

      expect(list.length).toBe(1);

      expect(list[0].classList).toContain('first');
      expect(list[0].classList).toContain('last');
    });
  });

  describe('when a list have 2 elements', () => {
    beforeEach(async () => {
      spectator = createHost<ListComponent>(
        `
          <kirby-list [items]="[{ name: 'Item1' }, { name: 'Item2' }]" (itemSelect)="($event)">
            <kirby-item *kirbyListItemTemplate="let item"><h3>{{ item.name }}</h3></kirby-item>
          </kirby-list>
          `
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

  describe('when a list have 3 elements', () => {
    beforeEach(async () => {
      spectator = createHost<ListComponent>(
        `
          <kirby-list [items]="[{ name: 'Item1' }, { name: 'Item2' }, { name: 'Item3' }]" (itemSelect)="($event)">
            <kirby-item *kirbyListItemTemplate="let item"><h3>{{ item.name }}</h3></kirby-item>
          </kirby-list>
          `
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
