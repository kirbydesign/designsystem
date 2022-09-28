import { EventEmitter } from '@angular/core';

import { ListComponent } from '../list.component';
import { LoadOnDemandEvent } from '../list.event';

import { ListHelper } from './list-helper';

describe('list helper', () => {
  let listHelper: ListHelper;

  beforeEach(() => {
    listHelper = new ListHelper();
  });

  describe('function: onLoadOnDemand', () => {
    let loadMoreEmitSpy: jasmine.Spy;
    let component: ListComponent;
    beforeEach(() => {
      component = {
        loadOnDemand: new EventEmitter<LoadOnDemandEvent>(),
      } as ListComponent;
      loadMoreEmitSpy = spyOn(component.loadOnDemand, 'emit').and.callThrough();
      component.loadOnDemand.subscribe((_loadMoreEvent: LoadOnDemandEvent) => {});
    });

    it('should emit load more event, if load on demand is enabled and is not loading', () => {
      component.isLoadOnDemandEnabled = true;
      component._isLoading = false;

      listHelper.onLoadOnDemand(component, null);

      expect(component.loadOnDemand.emit).toHaveBeenCalledTimes(1);
    });

    it('should not emit load more event, if load more is not enabled', () => {
      component.isLoadOnDemandEnabled = false;

      listHelper.onLoadOnDemand(component, null);

      expect(component.loadOnDemand.emit).not.toHaveBeenCalled();
    });

    it('should not emit load more event, if is loading', () => {
      component._isLoading = true;

      listHelper.onLoadOnDemand(component, null);

      expect(component.loadOnDemand.emit).not.toHaveBeenCalled();
    });

    it('should not emit load more event, if tload on demand is disabled and is loading', () => {
      component._isLoading = true;
      component.isLoadOnDemandEnabled = false;

      listHelper.onLoadOnDemand(component, null);

      expect(component.loadOnDemand.emit).not.toHaveBeenCalled();
    });

    it('should not emit load more event, if load on demand is disabled', () => {
      component.isLoadOnDemandEnabled = false;

      listHelper.onLoadOnDemand(component, null);

      expect(component.loadOnDemand.emit).not.toHaveBeenCalled();
    });

    it('should start loading, when before emitting an load more event', () => {
      component._isLoading = false;
      component.isLoadOnDemandEnabled = true;

      listHelper.onLoadOnDemand(component, null);

      expect(component._isLoading).toBeTruthy();
    });

    it('should end loading, if the load more events complete callback is called', () => {
      component.items = [];
      loadMoreEmitSpy.and.callFake((event: LoadOnDemandEvent) => {
        event.complete();
      });

      listHelper.onLoadOnDemand(component, null);

      expect(component._isLoading).toBeFalsy();
    });

    it('should be marked as having load on demand disabled, if the load more events complete callback is called with true', () => {
      loadMoreEmitSpy.and.callFake((event: LoadOnDemandEvent) => {
        event.complete(true);
      });

      listHelper.onLoadOnDemand(component, null);

      expect(component.isLoadOnDemandEnabled).toBeFalsy();
    });

    it('should be marked as having load on demand disabled, if the load more events complete callback is called with false', () => {
      loadMoreEmitSpy.and.callFake((event: LoadOnDemandEvent) => {
        event.complete(false);
      });
      component.isLoadOnDemandEnabled = true;

      listHelper.onLoadOnDemand(component, null);

      expect(component.isLoadOnDemandEnabled).toBeTruthy();
    });
  });

  describe('function: groupSections', () => {
    it('should section list by callback function', () => {
      const callback = (item: any) => {
        return item.title;
      };
      const collection = [
        {
          title: 'section 1',
          value: 1,
        },
        {
          title: 'section 2',
          value: 2,
        },
        {
          title: 'section 3',
          value: 3,
        },
      ];

      const result = listHelper.groupSections(collection, callback);

      expect(result.length).toBe(3);
      result.forEach((section: any, index: number) => {
        expect(section.items.length).toBe(1);
        expect(section.items[0]).toEqual(collection[index]);
      });
    });

    it('should order sections by alphabetical order', () => {
      const callback = (item: any) => {
        return item.title;
      };
      const collection = [
        {
          title: 'section 202',
          value: 1,
        },
        {
          title: 'section 1',
          value: 2,
        },
        {
          title: 'section 44',
          value: 3,
        },
      ];

      const result = listHelper.groupSections(collection, callback);
      expect(result[0].name).toEqual('section 1');
      expect(result[1].name).toEqual('section 202');
      expect(result[2].name).toEqual('section 44');
    });
  });

  describe('function: groupStandAloneItems', () => {
    it('should divide items into sublists based on "standAloneProperty"', () => {
      const standAloneProperty = 'isStandAlone';
      const collection = [
        {
          title: 'Item 1',
          value: 1,
        },
        {
          title: 'Item 2',
          value: 2,
        },
        {
          title: 'Item 3',
          value: 3,
          isStandAlone: true,
        },
        {
          title: 'Item 4',
          value: 4,
        },
        {
          title: 'Item 5',
          value: 5,
        },
      ];

      const result = listHelper.groupStandAloneItems(collection, standAloneProperty);

      expect(result[0]).toEqual({
        items: [
          {
            title: 'Item 1',
            value: 1,
          },
          {
            title: 'Item 2',
            value: 2,
          },
        ],
      });
      expect(result[1]).toEqual({
        items: [
          {
            title: 'Item 3',
            value: 3,
            isStandAlone: true,
          },
        ],
      });
      expect(result[2]).toEqual({
        items: [
          {
            title: 'Item 4',
            value: 4,
          },
          {
            title: 'Item 5',
            value: 5,
          },
        ],
      });
    });
  });

  describe('function: groupSectionsWithStandAloneItems', () => {
    it('should create sections with sublists"', () => {
      const callback = (item: any) => {
        return item.title;
      };
      const standAloneProperty = 'isStandAlone';
      const collection = [
        {
          title: 'Section 1',
          value: 1,
        },
        {
          title: 'Section 2',
          value: 2,
        },
        {
          title: 'Section 1',
          value: 3,
        },
        {
          title: 'Section 2',
          value: 4,
          isStandAlone: true,
        },
        {
          title: 'Section 2',
          value: 5,
        },
      ];

      const result = listHelper.groupSectionsWithStandAloneItems(
        collection,
        callback,
        standAloneProperty
      );

      expect(result.length).toBe(2);
      expect(Array.isArray(result[1].lists[0])).toBe(true);
      expect(Array.isArray(result[1].lists[1])).toBe(true);
      expect(Array.isArray(result[1].lists[2])).toBe(true);
    });
  });
});
