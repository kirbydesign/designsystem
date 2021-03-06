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
});
