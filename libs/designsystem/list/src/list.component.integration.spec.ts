import { createHostFactory, SpectatorHost } from '@ngneat/spectator';

import { DesignTokenHelper, PlatformService } from '@kirbydesign/designsystem/helpers';

import { WindowRef } from '@kirbydesign/designsystem/types';
import { TestHelper } from '@kirbydesign/designsystem/testing';
import { SpinnerModule } from '@kirbydesign/designsystem/spinner';
import { CardModule } from '@kirbydesign/designsystem/card';
import { IconComponent } from '@kirbydesign/designsystem/icon';
import { ItemComponent } from '@kirbydesign/designsystem/item';
import { ListComponent, ListModule, ListSwipeAction } from '..';

const { fontWeight, size } = DesignTokenHelper;

describe('ListComponent', () => {
  let ionList: HTMLElement;
  let itemsInList: HTMLElement[];

  let spectator: SpectatorHost<ListComponent>;
  const mockPlatformServiceIsTouchTrue = {
    isTouch: () => true,
    isTablet: () => false,
  };

  const createHost = createHostFactory({
    component: ListComponent,
    imports: [TestHelper.ionicModuleForTest, CardModule, SpinnerModule, ListModule],
    providers: [
      {
        provide: WindowRef,
        useValue: <WindowRef>{ nativeWindow: window },
      },
    ],
    declarations: [ItemComponent, IconComponent],
  });

  describe('with kirby-item', () => {
    let itemTexts: HTMLElement[];

    beforeEach(async () => {
      spectator = createHost<ListComponent>(
        `
        <kirby-list (itemSelect)="($event)">
          <kirby-item *kirbyListItemTemplate="let item"><h3>{{ item.name }}</h3></kirby-item>
        </kirby-list>
        `,
        {
          props: {
            items: [{ name: 'Item1' }, { name: 'Item2' }, { name: 'Item3' }],
          },
          providers: [{ provide: PlatformService, useValue: mockPlatformServiceIsTouchTrue }],
        }
      );
      ionList = spectator.queryHost('ion-list');
      await TestHelper.whenReady(ionList);
      itemsInList = spectator.queryAll('ion-list ion-item');
      itemTexts = spectator.queryAll('ion-list kirby-item ion-item h3');
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

    it('should highlight selected item in bold text', async () => {
      await spectator.click(itemsInList[1]);

      console.log(itemTexts[1]);
      expect(itemTexts[0]).toHaveComputedStyle({ 'font-weight': fontWeight('normal') });
      expect(itemTexts[1]).toHaveComputedStyle({ 'font-weight': fontWeight('bold') });
      expect(itemTexts[2]).toHaveComputedStyle({ 'font-weight': fontWeight('normal') });
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

        expect(kirbyItemsInList).toHaveLength(2);

        kirbyItemsInList.forEach((item) => {
          expect(item).toHaveComputedStyle({ 'margin-bottom': size('s') });
        });
      });

      it('should not apply spacing to the last item', () => {
        spectator.setInput('hasItemSpacing', true);
        spectator.detectChanges();
        const kirbyItemsInList = spectator.queryAll('kirby-list-item:last-child');

        expect(kirbyItemsInList).toHaveLength(1);
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

        expect(kirbyItemsInList).toHaveLength(3);
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
        <kirby-list>
          <kirby-card *kirbyListItemTemplate="let item">
            <kirby-item>{{ item.name }}</kirby-item>
          </kirby-card>
        </kirby-list>
        `,
        {
          props: {
            items: [{ name: 'Item1' }, { name: 'Item2' }, { name: 'Item3' }],
          },
          providers: [{ provide: PlatformService, useValue: mockPlatformServiceIsTouchTrue }],
        }
      );
      ionList = spectator.queryHost('ion-list');
      await TestHelper.whenReady(ionList);
      itemsInList = spectator.queryAll('ion-list ion-item');

      await TestHelper.whenReady(itemsInList);
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

  describe('when a list has 1 element', () => {
    const action: ListSwipeAction = {
      position: 'left',
      title: 'Action',
      onSelected: () => {},
    };

    beforeEach(async () => {
      spectator = createHost<ListComponent>(
        `
        <kirby-list  (itemSelect)="($event)">
          <kirby-item *kirbyListItemTemplate="let item"><h3>{{ item.name }}</h3></kirby-item>
        </kirby-list>
        `,
        {
          props: { items: [{ name: 'Item1' }], swipeActions: [action] },
          providers: [{ provide: PlatformService, useValue: mockPlatformServiceIsTouchTrue }],
        }
      );
    });

    it(`should apply the CSS class 'first' and 'last' on the first and only element in the list`, async () => {
      const list = await spectator.queryAll('ion-item-sliding');

      expect(list.length).toBe(1);

      expect(list[0].classList).toContain('first');
      expect(list[0].classList).toContain('last');
    });
  });

  describe('when a list has 2 elements', () => {
    const action: ListSwipeAction = {
      position: 'left',
      title: 'Archive',
      type: 'warning',
      onSelected: (item) => null,
      isDisabled: (_item: any) => false,
      icon: 'more',
    };
    beforeEach(async () => {
      spectator = createHost<ListComponent>(
        `
          <kirby-list (itemSelect)="($event)">
            <kirby-item *kirbyListItemTemplate="let item"><h3>{{ item.name }}</h3></kirby-item>
          </kirby-list>
          `,
        {
          props: { items: [{ name: 'Item1' }, { name: 'Item2' }], swipeActions: [action] },
          providers: [{ provide: PlatformService, useValue: mockPlatformServiceIsTouchTrue }],
        }
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
    const action: ListSwipeAction = {
      position: 'left',
      title: 'Archive',
      type: 'warning',
      onSelected: (item) => null,
      isDisabled: (_item: any) => false,
      icon: 'more',
    };

    beforeEach(async () => {
      spectator = createHost<ListComponent>(
        `
          <kirby-list (itemSelect)="($event)">
            <kirby-item *kirbyListItemTemplate="let item"><h3>{{ item.name }}</h3></kirby-item>
          </kirby-list>
          `,
        {
          props: {
            items: [{ name: 'Item1' }, { name: 'Item2' }, { name: 'Item3' }],
            swipeActions: [action],
          },
          providers: [{ provide: PlatformService, useValue: mockPlatformServiceIsTouchTrue }],
        }
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
