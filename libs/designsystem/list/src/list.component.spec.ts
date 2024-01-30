import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import * as ionic from '@ionic/angular';
import { WindowRef } from '@kirbydesign/designsystem/types';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { MockComponent } from 'ng-mocks';
import { SpinnerModule } from 'spinner/src';

import { InfiniteScrollDirective } from './directives/infinite-scroll.directive';
import { ListItemColorDirective } from './directives/list-item-color.directive';
import { ListHelper } from './helpers/list-helper';
import { ListItemComponent } from './list-item/list-item.component';
import { ListComponent } from './list.component';

type Transaction = {
  id: number;
  title: string;
  subTitle: string;
  amount: string;
  detail: number;
  color: string;
};

const transactions: Transaction[] = [
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
      {
        provide: WindowRef,
        useValue: <WindowRef>{ nativeWindow: window },
      },
    ],
    imports: [SpinnerModule],
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
    it('should be disabled if no getSectionName function is defined', () => {
      spectator.setInput({
        getSectionName: undefined,
      });

      expect(spectator.component._isSectionsEnabled).toBeFalsy();
    });

    it('should be enabled if a getSectionName function is defined', () => {
      spectator.setInput({
        items: transactions,
        getSectionName: () => 'this is a test',
      });

      expect(spectator.component._isSectionsEnabled).toBeTruthy();
    });

    it('should have no groupedItems when last item in items input is removed', () => {
      spectator.setInput({
        items: [transactions[0]],
        getSectionName: () => 'this is a test',
      });

      expect(spectator.component._groupedItems).toHaveLength(1);

      spectator.setInput({ items: [] });

      expect(spectator.component._groupedItems).toHaveLength(0);
    });
  });

  describe('divider', () => {
    it('should set class "has-divider" on list element when showDivider is true', () => {
      spectator.setInput({
        items: transactions,
        showDivider: true,
      });

      const list = spectator.query('ion-list');
      expect(list.classList).toContain('has-divider');
    });

    it('should not set class "has-divider" on list element when showDivider is false', () => {
      spectator.setInput({
        items: transactions,
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
        component.loadOnDemand.subscribe(() => {});
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
});
