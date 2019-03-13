import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupByPipe } from './pipes/group-by.pipe';
import { ListComponent } from './list.component';
import { SpinnerComponent } from '~/kirby';
import { InfiniteScrollDirective } from './directives/infinite-scroll.directive';
import { WindowRef } from './../shared/window-ref/window-ref.service';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ListComponent, GroupByPipe, SpinnerComponent, InfiniteScrollDirective],
      providers: [
        {
          provide: WindowRef,
          useValue: {} as WindowRef,
        },
      ],
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

  describe('item select event', () => {
    it('should emit the clicked item', () => {
      spyOn(component.itemSelect, 'emit');
      const itemToBeSelected = { value: 'this is a dummy item' };

      component.onItemClick(itemToBeSelected);

      expect(component.itemSelect.emit).toHaveBeenCalledTimes(1);
      expect(component.itemSelect.emit).toHaveBeenCalledWith(itemToBeSelected);
    });
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

  describe('function: onLoadMore', () => {
    it('should shoul add returned items to end of list, if there are more items and is not loading', (done) => {
      const items = [1, 2];
      const newItems = [3, 4];
      const expected = [...items, ...newItems];
      component.items = items;
      component.hasMoreItems = true;
      component.isLoading = false;
      component.loadMore = () => Promise.resolve(newItems);

      component.onLoadMore().then(() => {
        expect(component.items).toEqual(expected);
        done();
      });
    });

    it('should not add any items, if there are no more items', (done) => {
      const expected = [1, 2];
      const newItems = [3, 4];
      component.items = expected;
      component.hasMoreItems = false;
      component.loadMore = () => Promise.resolve(newItems);

      component.onLoadMore().then(() => {
        expect(component.items).toEqual(expected);
        done();
      });
    });

    it('should not add any items, if is loading', (done) => {
      const expected = [1, 2];
      const newItems = [3, 4];
      component.items = expected;
      component.isLoading = true;
      component.loadMore = () => Promise.resolve(newItems);

      component.onLoadMore().then(() => {
        expect(component.items).toEqual(expected);
        done();
      });
    });

    it('should not add any items, if no load more callback is not defined', (done) => {
      const expected = [1, 2];
      component.items = expected;

      component.onLoadMore().then(() => {
        expect(component.items).toEqual(expected);
        done();
      });
    });

    it('should not add any items, if there are no more items and is loading', (done) => {
      const expected = [1, 2];
      const newItems = [3, 4];
      component.items = expected;
      component.isLoading = true;
      component.hasMoreItems = false;
      component.loadMore = () => Promise.resolve(newItems);

      component.onLoadMore().then(() => {
        expect(component.items).toEqual(expected);
        done();
      });
    });

    it('should end loading, if the load more callback succes', (done) => {
      const expected = [1, 2];
      const newItems = [3, 4];
      component.items = expected;
      component.loadMore = () => Promise.resolve(newItems);

      component.onLoadMore().then(() => {
        console.log(component.isLoading);
        expect(component.isLoading).toBeFalsy();
        done();
      });
    });

    it('should end loading, if the load more callback fails', (done) => {
      component.loadMore = () => Promise.reject('error');

      component.onLoadMore().then(() => {
        expect(component.isLoading).toBeFalsy();
        done();
      });
    });
  });
});
