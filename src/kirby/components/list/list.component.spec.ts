import { createTestComponentFactory, Spectator } from '@netbasal/spectator';
import { MockComponent } from 'ng-mocks';
import * as ionic from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { LoadOnDemandEvent } from './list.event';
import { GroupByPipe } from './pipes/group-by.pipe';
import { ListComponent } from './list.component';
import { SpinnerComponent } from '../spinner/spinner.component';
import { InfiniteScrollDirective } from './directives/infinite-scroll.directive';
import { ListHelper } from './helpers/list-helper';
import { ListItemColorDirective } from './directives/list-item-color.directive';

/**
 * We need an actual model item, since WeakMap can't use primitives for keys.
 */
class Item {
  static createItems(...values: number[]) {
    return values.map((value) => new Item(value));
  }

  constructor(public value: number) {}
}

describe('ListComponent', () => {
  let spectator: Spectator<ListComponent>;
  let component: ListComponent;

  function runNgOnChanges() {
    // Forces ngOnChanges to run (since that won't happen, when inputs are changed programmatically)
    component.ngOnChanges();
    // Detect changes, since ngOnChanges altered state of component
    spectator.detectChanges();
  }

  const createHost = createTestComponentFactory({
    component: ListComponent,
    declarations: [
      ListComponent,
      GroupByPipe,
      SpinnerComponent,
      InfiniteScrollDirective,
      ListItemColorDirective,
      MockComponent(ionic.IonList),
      MockComponent(ionic.IonListHeader),
      MockComponent(ionic.IonLabel),
      MockComponent(ionic.IonItem),
      MockComponent(ionic.IonItemDivider),
      MockComponent(ionic.IonItemGroup),
      MockComponent(ionic.IonItemSliding),
    ],
    providers: [ListHelper, GroupByPipe],
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
      runNgOnChanges();

      expect(spectator.component.items).toBe(null);
    });
  });

  describe('sections', () => {
    it('should be disabled if no section callback is defined', () => {
      spectator.setInput({
        getSectionName: undefined,
      });
      runNgOnChanges();

      expect(spectator.component.isSectionsEnabled).toBeFalsy();
    });

    it('should be enabled if a section callback is defined', () => {
      spectator.setInput({
        items: Item.createItems(1, 2, 3),
        getSectionName: (item: any) => 'this is a test',
      });
      runNgOnChanges();

      expect(spectator.component.isSectionsEnabled).toBeTruthy();
    });

    it('should render one item element for each item, if the list is not sectioned', () => {
      spectator.setInput({
        items: Item.createItems(1, 2, 3),
      });
      runNgOnChanges();

      const liElements = spectator.queryAll('ion-item');
      expect(liElements.length).toEqual(component.items.length);
    });

    it('should render one ion-item for each ion-item-group and one for each section, if sections are enabled', () => {
      spectator.setInput({
        items: Item.createItems(1, 2, 3),
        getSectionName: (item: Item) => (item.value % 2 === 0 ? 'even' : 'odd'),
      });
      runNgOnChanges();

      const liElements = spectator.queryAll('ion-item');
      expect(liElements.length).toEqual(component.items.length);
    });
  });

  describe('divider', () => {
    it('should set class "divider" on all items elements when showDivider is true', () => {
      spectator.setInput({
        items: Item.createItems(1, 2, 3),
        showDivider: true,
      });
      runNgOnChanges();

      const liElements = spectator.queryAll('ion-item');
      liElements.forEach((liElement) => {
        expect(liElement.getAttribute('class')).toContain('divider');
      });
    });

    it('should not set class "divider" on any item elements when showDivider is false', () => {
      spectator.setInput({
        items: Item.createItems(1, 2, 3),
        showDivider: false,
      });
      runNgOnChanges();

      const liElements = spectator.queryAll('ion-item');
      liElements.forEach((liElement) => {
        expect(liElement.getAttribute('class')).not.toContain('divider');
      });
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
    it('should enable load more, if there is a subscriber to the loadMore event emitter', () => {
      component.loadOnDemand.subscribe((_: LoadOnDemandEvent) => {});

      component.ngOnInit();

      expect(component.isLoadOnDemandEnabled).toBeTruthy();
    });

    it('should disable load more, if there is no subscriber to the loadMore event emitter', () => {
      runNgOnChanges();

      expect(component.isLoadOnDemandEnabled).toBeFalsy();
    });
  });

  describe('first/last in section', () => {
    it('should return true for sectioned list with rounded corners and a single entry', () => {
      const items = Item.createItems(1);
      spectator.setInput({
        items,
        shape: 'rounded',
        getSectionName: () => 'bob',
      });
      runNgOnChanges();

      expect(component.isFirstItem(component.items[0], 0)).toEqual(true);
      expect(component.isLastItem(component.items[0], 0)).toEqual(true);
    });

    it('should return true for sectioned list with rounded corners and multiple entries', () => {
      const items = Item.createItems(1, 2, 3, 4);
      spectator.setInput({
        items,
        shape: 'rounded',
        getSectionName: (item: Item) => (item.value % 2 == 0 ? 'even' : 'odd'),
      });
      runNgOnChanges();

      expect(component.isFirstItem(component.items[0], 0)).toEqual(true);
      expect(component.isLastItem(component.items[0], 0)).toEqual(false);

      expect(component.isFirstItem(component.items[1], 1)).toEqual(true);
      expect(component.isLastItem(component.items[1], 1)).toEqual(false);

      expect(component.isFirstItem(component.items[2], 2)).toEqual(false);
      expect(component.isLastItem(component.items[2], 2)).toEqual(true);

      expect(component.isFirstItem(component.items[3], 3)).toEqual(false);
      expect(component.isLastItem(component.items[3], 3)).toEqual(true);
    });
  });
});
