import { createHostFactory, SpectatorHost } from '@ngneat/spectator';

import { DesignTokenHelper } from '@kirbydesign/core';

import {
  CardComponent,
  IconComponent,
  InfiniteScrollDirective,
  ItemComponent,
  ListComponent,
  ListItemColorDirective,
  ListItemTemplateDirective,
  SpinnerComponent,
} from '..';
import { TestHelper } from '../../testing/test-helper';
import { WindowRef } from '../../types/window-ref';

import { ListItemComponent } from './list-item/list-item.component';

const { fontWeight, size } = DesignTokenHelper;

describe('ListComponent', () => {
  let ionList: HTMLElement;
  let itemsInList: HTMLElement[];

  let spectator: SpectatorHost<ListComponent>;
  const createHost = createHostFactory({
    component: ListComponent,
    imports: [TestHelper.ionicModuleForTest],
    providers: [
      {
        provide: WindowRef,
        useValue: <WindowRef>{ nativeWindow: window },
      },
    ],
    declarations: [
      ItemComponent,
      SpinnerComponent,
      IconComponent,
      CardComponent,
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
});
