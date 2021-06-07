import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import * as ionic from '@ionic/angular';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { MockComponent } from 'ng-mocks';

import { WindowRef } from '../../types/window-ref';
import { SpinnerComponent } from '../spinner/spinner.component';

import { InfiniteScrollDirective } from './directives/infinite-scroll.directive';
import { ListItemColorDirective } from './directives/list-item-color.directive';
import { ListHelper } from './helpers/list-helper';
import { ListComponent } from './list.component';
import { LoadOnDemandEvent } from './list.event';
import { GroupByPipe } from './pipes/group-by.pipe';

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

  const createHost = createComponentFactory({
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
        getSectionName: (_item: any) => 'this is a test',
      });
      runNgOnChanges();

      expect(spectator.component.isSectionsEnabled).toBeTruthy();
    });
  });

  describe('divider', () => {
    it('should set class "has-divider" on list element when showDivider is true', () => {
      spectator.setInput({
        items: Item.createItems(1, 2, 3),
        showDivider: true,
      });
      runNgOnChanges();

      const list = spectator.query('ion-list');
      expect(list.classList).toContain('has-divider');
    });

    it('should not set class "has-divider" on list element when showDivider is false', () => {
      spectator.setInput({
        items: Item.createItems(1, 2, 3),
        showDivider: false,
      });
      runNgOnChanges();

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
});
