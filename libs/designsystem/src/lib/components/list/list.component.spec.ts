import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import * as ionic from '@ionic/angular';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { MockComponent } from 'ng-mocks';
import { ExpandOperator } from 'rxjs/internal/operators/expand';

import { WindowRef } from '../../types/window-ref';
import { SpinnerComponent } from '../spinner/spinner.component';

import { InfiniteScrollDirective } from './directives/infinite-scroll.directive';
import { ListItemColorDirective } from './directives/list-item-color.directive';
import { ListHelper } from './helpers/list-helper';
import { EndClass, ListItem, ListItemComponent } from './list-item/list-item.component';
import { ListComponent } from './list.component';
import { LoadOnDemandEvent } from './list.event';
import { GroupByPipe } from './pipes/group-by.pipe';

const TEST_ITEMS: ListItem[] = [
  {
    id: 0,
    title: 'Vestas Wind Systems has a very long name',
    subTitle: '2000 pcs',
    amount: '5.587.218.309 DKK',
    detail: 225,
    color: 'default',
  },
  {
    id: 1,
    title: 'Cypress Semiconductor Corporation',
    subTitle: '1827 pcs',
    amount: '76.980 DKK',
    detail: -3,
    color: 'light',
  },
  {
    id: 2,
    title: 'Ultragenyx Pharmaceutical Inc.',
    subTitle: '787 pcs',
    amount: '83.004 DKK',
    detail: -115,
    color: 'white',
  },
  {
    id: 3,
    title: 'Trans World Entertainment Corp.',
    subTitle: '467 pcs',
    amount: '60.963 DKK',
    detail: 6,
    color: 'light',
  },
];

describe('ListComponent', () => {
  let spectator: Spectator<ListComponent>;
  let component: ListComponent;

  const createHost = createComponentFactory({
    component: ListComponent,
    declarations: [
      ListComponent,
      GroupByPipe,
      SpinnerComponent,
      InfiniteScrollDirective,
      ListItemColorDirective,
      ListItemComponent,
      MockComponent(ionic.IonList),
      MockComponent(ionic.IonListHeader),
      MockComponent(ionic.IonLabel),
      MockComponent(ionic.IonItem),
      MockComponent(ionic.IonItemDivider),
      MockComponent(ionic.IonItemGroup),
      MockComponent(ionic.IonItemSliding),
    ],
    providers: [
      ListHelper,
      GroupByPipe,
      {
        provide: WindowRef,
        useValue: window,
      },
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
  });

  beforeEach(() => {
    spectator = createHost({});
    component = spectator.component;
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  describe('items', () => {
    it('should accept null items without errors', () => {
      spectator.setInput({
        items: null,
      });

      expect(spectator.component.items).toBe(null);
    });
  });

  describe('sections', () => {
    it('should be disabled if no section callback is defined', () => {
      spectator.setInput({
        getSectionName: undefined,
      });

      expect(spectator.component._isSectionsEnabled).toBeFalsy();
    });

    it('should be enabled if a section callback is defined', () => {
      spectator.setInput({
        items: TEST_ITEMS,
        getSectionName: (item: ListItem) => 'this is a test',
      });

      expect(spectator.component._isSectionsEnabled).toBeTruthy();
    });
  });

  describe('divider', () => {
    it('should set class "has-divider" on list element when showDivider is true', () => {
      spectator.setInput({
        items: TEST_ITEMS,
        showDivider: true,
      });

      const list = spectator.query('ion-list');
      expect(list.classList).toContain('has-divider');
    });

    it('should not set class "has-divider" on list element when showDivider is false', () => {
      spectator.setInput({
        items: TEST_ITEMS,
        showDivider: false,
      });

      const list = spectator.query('ion-list');
      expect(list.classList).not.toContain('has-divider');
    });
  });

  describe('function: onItemSelect', () => {
    it('should emit the selected item and mark it as selected', () => {
      spyOn(component.itemSelect, 'emit');
      const itemToBeSelected = { value: 'this is a dummy item' };
      component.items = [itemToBeSelected];

      component.onItemSelect(itemToBeSelected);

      expect(component.itemSelect.emit).toHaveBeenCalledTimes(1);
      expect(component.itemSelect.emit).toHaveBeenCalledWith(itemToBeSelected);
    });
  });

  describe('function: ngOnInit', () => {
    describe('when there is a subscriber to the loadMore event', () => {
      beforeEach(() => {
        component.loadOnDemand.subscribe((_: LoadOnDemandEvent) => {});
      });

      it('should enable load more, if isLoadOnDemandEnabled is not set', () => {
        component.isLoadOnDemandEnabled = undefined;

        component.ngOnInit();

        expect(component.isLoadOnDemandEnabled).toBeTrue();
      });

      it('should enable load more, if isLoadOnDemandEnabled is set to true', () => {
        component.isLoadOnDemandEnabled = undefined;

        component.ngOnInit();

        expect(component.isLoadOnDemandEnabled).toBeTrue();
      });

      it('should disable load more, if isLoadOnDemandEnabled is set to false', () => {
        component.isLoadOnDemandEnabled = false;

        component.ngOnInit();

        expect(component.isLoadOnDemandEnabled).toBeFalse();
      });
    });

    describe('when there is no subscriber to the loadMore event', () => {
      it('should disable load more, if isLoadOnDemandEnabled is not set', () => {
        component.isLoadOnDemandEnabled = undefined;

        component.ngOnInit();

        expect(component.isLoadOnDemandEnabled).toBeFalse();
      });

      it('should disable load more, if isLoadOnDemandEnabled is set to false', () => {
        component.isLoadOnDemandEnabled = false;

        component.ngOnInit();

        expect(component.isLoadOnDemandEnabled).toBeFalse();
      });
    });
  });

  describe('virtual scroll', () => {
    beforeEach(() => {
      spectator.setInput('useVirtualScroll', true);
      spectator.setInput('items', TEST_ITEMS);
    });

    it('should set default viewport height, when virtual scrolling is active', () => {
      const list = spectator.query('.viewport');

      expect(list).toHaveComputedStyle({ height: '500px' });
    });

    it('should set viewport height according to input', () => {
      spectator.setInput('virtualScrollViewportHeight', 400);

      const list = spectator.query('.viewport');

      expect(list).toHaveComputedStyle({ height: '400px' });
    });

    it('returns correct end-class to items', () => {
      const first = component.getFirstOrLastClass(0);
      const last = component.getFirstOrLastClass(TEST_ITEMS.length - 1);

      expect(first).toEqual(EndClass.first);
      expect(last).toEqual(EndClass.last);
    });

    describe('when sections', () => {
      beforeEach(() => {
        const getSectionName = (item: ListItem): string => {
          return item.detail > 0 ? 'Positive' : 'Negative';
        };
        spectator.setInput('getSectionName', getSectionName);
      });

      it('items are grouped correctly', () => {
        expect(component._virtualGroupedItems).toEqual([
          { headingName: 'Negative' },
          {
            id: 1,
            title: 'Cypress Semiconductor Corporation',
            subTitle: '1827 pcs',
            amount: '76.980 DKK',
            detail: -3,
            color: 'light',
          },
          {
            id: 2,
            title: 'Ultragenyx Pharmaceutical Inc.',
            subTitle: '787 pcs',
            amount: '83.004 DKK',
            detail: -115,
            color: 'white',
          },

          { headingName: 'Positive' },
          {
            id: 0,
            title: 'Vestas Wind Systems has a very long name',
            subTitle: '2000 pcs',
            amount: '5.587.218.309 DKK',
            detail: 225,
            color: 'default',
          },
          {
            id: 3,
            title: 'Trans World Entertainment Corp.',
            subTitle: '467 pcs',
            amount: '60.963 DKK',
            detail: 6,
            color: 'light',
          },
        ]);
      });

      it('returns correct end-class to items', () => {
        const section1first = component.getFirstOrLastClass(1);
        const section1last = component.getFirstOrLastClass(2);
        const section2first = component.getFirstOrLastClass(4);
        const section2last = component.getFirstOrLastClass(5);

        expect(section1first).toEqual(EndClass.first);
        expect(section2first).toEqual(EndClass.first);
        expect(section1last).toEqual(EndClass.last);
        expect(section2last).toEqual(EndClass.last);
      });
    });
  });
});
