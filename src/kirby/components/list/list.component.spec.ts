import { GroupByPipe } from './pipes/group-by.pipe';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListComponent } from './list.component';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListComponent, GroupByPipe ]
    })
    .compileComponents();
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

    it('should emit the tapped item', () => {
      spyOn(component.itemSelect, 'emit');
      const itemToBeSelected = { value: 'item 2' };
      component.items = [
        { value: 'item 1' },
        itemToBeSelected,
        { value: 'item 3' }
      ];

      component.onItemTap(itemToBeSelected);

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

  describe('Native: HeaderTemplate', () => {

    it('should return the correct grid row definition, when there is a template', () => {
      const expected = 'auto,*';

      const actual = component.rowDefinition({});

      expect(actual).toEqual(expected);
    });

    it('should return the correct grid row definition, when there is no template', () => {
      const expected = '*';

      const actual = component.rowDefinition(null);

      expect(actual).toEqual(expected);
    });

    it('should return the correct row number, when there is a template', () => {
      const expected = '1';

      const actual = component.rowNumberForListView({});

      expect(actual).toEqual(expected);
    });

    it('should return the correct row number, when there is no template', () => {
      const expected = '0';

      const actual = component.rowNumberForListView(null);

      expect(actual).toEqual(expected);
    });
  });
});
