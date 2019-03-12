import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLoadMoreService } from './services/list-load-more.service';
import { GroupByPipe } from './pipes/group-by.pipe';
import { ListComponent } from './list.component';
import { SpinnerComponent } from '~/kirby';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ListComponent, GroupByPipe, SpinnerComponent],
      providers: [
        {
          provide: ListLoadMoreService,
          useValue: jasmine.createSpyObj('ListLoadMoreService', ['handleLoadMore']),
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
    let listLoadMoreService: any;

    beforeEach(() => {
      listLoadMoreService = TestBed.get(ListLoadMoreService);
      listLoadMoreService.handleLoadMore.and.returnValue(Promise.resolve(true));
    });

    it('should call list-load-more-service if there are more items and is not loading', () => {
      component.hasMoreItems = true;
      component.isLoading = false;
      component.onLoadMore();
      expect(listLoadMoreService.handleLoadMore).toHaveBeenCalled();
    });

    it('should not call list-load-more-service if there are no more items', () => {
      component.hasMoreItems = false;
      component.onLoadMore();
      expect(listLoadMoreService.handleLoadMore).not.toHaveBeenCalled();
    });

    it('should not call list-load-more-service if is loading', () => {
      component.isLoading = true;
      component.onLoadMore();
      expect(listLoadMoreService.handleLoadMore).not.toHaveBeenCalled();
    });

    it('should not call list-load-more-service if there are no more items and is loading', () => {
      component.isLoading = true;
      component.hasMoreItems = false;
      component.onLoadMore();
      expect(listLoadMoreService.handleLoadMore).not.toHaveBeenCalled();
    });

    fit('should set isLoading to true, when the load more callback succes', (done) => {
      component.hasMoreItems = true;
      component.isLoading = false;
      listLoadMoreService.handleLoadMore.and.returnValue(Promise.resolve());
      component.onLoadMore().then(() => {
        expect(component.isLoading).toBe(false);
        done();
      });
    });

    it('should set isLoading to false, if the load more callback fails', (done) => {
      component.hasMoreItems = true;
      component.isLoading = false;
      listLoadMoreService.handleLoadMore.and.returnValue(Promise.reject(new Error('fail')));
      component.onLoadMore().then(() => {
        expect(component.isLoading).toBe(false);
        done();
      });
    });
  });
});
