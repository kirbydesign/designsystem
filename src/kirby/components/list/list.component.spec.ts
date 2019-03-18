import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KirbyLoadMoreEvent } from './list.event';
import { GroupByPipe } from './pipes/group-by.pipe';
import { ListComponent } from './list.component';
import { SpinnerComponent } from '~/kirby';
import { InfiniteScrollDirective } from './directives/infinite-scroll.directive';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ListComponent, GroupByPipe, SpinnerComponent, InfiniteScrollDirective],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('sections', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(ListComponent);
      component = fixture.componentInstance;
    });

    it('should be disabled if no section callback is defined', () => {
      fixture.detectChanges();

      expect(component.isSectionsEnabled).toBeFalsy();
    });

    it('should be enabled if a section callback is defined', () => {
      component.getSectionName = (item: any) => 'this is a test';

      fixture.detectChanges();

      expect(component.isSectionsEnabled).toBeTruthy();
    });

    it('should render one li element for each item, if the list is not sectioned', () => {
      component.items = [1, 2, 3];

      fixture.detectChanges();

      const rootElement: HTMLElement = fixture.debugElement.nativeElement;
      const liElements = rootElement.querySelectorAll('li');

      expect(liElements.length).toEqual(component.items.length);
    });

    it('should render one li element for each item and one for each section, if sections are enabled', () => {
      const sections = ['section 1', 'section 2', 'section 3'];
      component.items = [0, 1, 2];
      component.getSectionName = (item: any): string => sections[item];

      fixture.detectChanges();

      const rootElement: HTMLElement = fixture.debugElement.nativeElement;
      const liElements = rootElement.querySelectorAll('li');

      expect(liElements.length).toEqual(component.items.length + sections.length);
    });
  });

  describe('function: onItemClick', () => {
    it('should emit the clicked item', () => {
      spyOn(component.itemSelect, 'emit');
      const itemToBeSelected = { value: 'this is a dummy item' };

      component.onItemClick(itemToBeSelected);

      expect(component.itemSelect.emit).toHaveBeenCalledTimes(1);
      expect(component.itemSelect.emit).toHaveBeenCalledWith(itemToBeSelected);
    });
  });

  describe('function: ngOnInit', () => {
    it('should enable load more, if there is a subscriber to the loadMore event emitter', () => {
      component.loadMore.subscribe((loadMoreEvent: KirbyLoadMoreEvent) => {});

      component.ngOnInit();

      expect(component.isLoadMoreEnabled).toBeTruthy();
    });

    it('should disable load more, if there is no subscriber to the loadMore event emitter', () => {
      component.ngOnInit();

      expect(component.isLoadMoreEnabled).toBeFalsy();
    });
  });

  describe('function: onLoadMore', () => {
    let loadMoreEmitSpy: jasmine.Spy;
    beforeEach(() => {
      loadMoreEmitSpy = spyOn(component.loadMore, 'emit').and.callThrough();
      component.loadMore.subscribe((loadMoreEvent: KirbyLoadMoreEvent) => {});
      component.ngOnInit();
    });

    it('should emit load more event, if there are more items and is not loading', () => {
      component.hasMoreItems = true;
      component.isLoading = false;

      component.onLoadMore();

      expect(component.loadMore.emit).toHaveBeenCalledTimes(1);
    });

    it('should not emit load more event, if load more is not enabled', () => {
      component.isLoadMoreEnabled = false;

      component.onLoadMore();

      expect(component.loadMore.emit).not.toHaveBeenCalled();
    });

    it('should not emit load more event, if is loading', () => {
      component.isLoading = true;

      component.onLoadMore();

      expect(component.loadMore.emit).not.toHaveBeenCalled();
    });

    it('should not emit load more event, if there are no more items and is loading', () => {
      component.isLoading = true;
      component.hasMoreItems = false;

      component.onLoadMore();

      expect(component.loadMore.emit).not.toHaveBeenCalled();
    });

    it('should not emit load more event, if there are no more items', () => {
      component.hasMoreItems = false;

      component.onLoadMore();

      expect(component.loadMore.emit).not.toHaveBeenCalled();
    });

    it('should start loading, when before emitting an load more event', () => {
      component.isLoading = false;
      component.hasMoreItems = true;

      component.onLoadMore();

      expect(component.isLoading).toBeTruthy();
    });

    it('should end loading, if the load more events complete callback is called', () => {
      component.items = [];
      loadMoreEmitSpy.and.callFake((event: KirbyLoadMoreEvent) => {
        event.complete();
      });

      component.onLoadMore();

      expect(component.isLoading).toBeFalsy();
    });

    it('should be marked as having no more items, if the load more events complete callback is called with true', () => {
      loadMoreEmitSpy.and.callFake((event: KirbyLoadMoreEvent) => {
        event.complete(true);
      });

      component.onLoadMore();

      expect(component.hasMoreItems).toBeFalsy();
    });

    it('should be marked as having more items, if the load more events complete callback is called with false', () => {
      loadMoreEmitSpy.and.callFake((event: KirbyLoadMoreEvent) => {
        event.complete(false);
      });

      component.onLoadMore();

      expect(component.hasMoreItems).toBeTruthy();
    });
  });
});
