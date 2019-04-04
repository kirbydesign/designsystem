import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadOnDemandEvent } from './list.event';
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

  describe('divider', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(ListComponent);
      component = fixture.componentInstance;
    });

    it('should set class "divider" on all li elements when showDivider is true', () => {
      component.items = [1, 2, 3];
      component.showDivider = true;

      fixture.detectChanges();

      const rootElement: HTMLElement = fixture.debugElement.nativeElement;
      const liElements = rootElement.querySelectorAll('li');

      liElements.forEach((liElement) => {
        expect(liElement.getAttribute('class')).toContain('divider');
      });
    });

    it('should not set class "divider" on any li elements when showDivider is false', () => {
      component.items = [1, 2, 3];
      component.showDivider = false;

      fixture.detectChanges();

      const rootElement: HTMLElement = fixture.debugElement.nativeElement;
      const liElements = rootElement.querySelectorAll('li');

      liElements.forEach((liElement) => {
        expect(liElement.getAttribute('class')).not.toContain('divider');
      });
    });
  });

  describe('function: onItemSelect', () => {
    it('should emit the selected item', () => {
      spyOn(component.itemSelect, 'emit');
      const itemToBeSelected = { value: 'this is a dummy item' };

      component.onItemSelect(itemToBeSelected);

      expect(component.itemSelect.emit).toHaveBeenCalledTimes(1);
      expect(component.itemSelect.emit).toHaveBeenCalledWith(itemToBeSelected);
    });
  });

  describe('function: ngOnInit', () => {
    it('should enable load more, if there is a subscriber to the loadMore event emitter', () => {
      component.loadOnDemand.subscribe((loadMoreEvent: LoadOnDemandEvent) => {});

      component.ngOnInit();

      expect(component.isLoadOnDemandEnabled).toBeTruthy();
    });

    it('should disable load more, if there is no subscriber to the loadMore event emitter', () => {
      component.ngOnInit();

      expect(component.isLoadOnDemandEnabled).toBeFalsy();
    });
  });
});
