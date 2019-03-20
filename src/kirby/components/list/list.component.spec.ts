import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';

import { GroupByPipe } from './pipes/group-by.pipe';
import { ListComponent, ListShape } from './list.component';
import { ListSectionHeaderComponent } from './list-section-header/list-section-header.component';
import { ListCellComponent } from './list-cell/list-cell.component';

@Component({
  template: `
    <kirby-list [getSectionName]="sectionNameResolver" [items]="items" [shape]="shape">
      <kirby-list-section-header
        *kirbyListSectionHeader="let section"
        [title]="section"
      ></kirby-list-section-header>
      <kirby-list-cell *kirbyListCell="let item">{{ item }}</kirby-list-cell>
    </kirby-list>
  `,
})
class ListHostComponent {
  sectionNameResolver: (item: any) => string;
  items: any[];
  shape: ListShape;
}

describe('ListComponent', () => {
  let testHost: ListHostComponent;
  let component: ListComponent;
  let fixture: ComponentFixture<ListHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ListHostComponent,
        ListComponent,
        ListSectionHeaderComponent,
        ListCellComponent,
        GroupByPipe,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListHostComponent);
    testHost = fixture.componentInstance;

    component = fixture.debugElement.query(By.directive(ListComponent)).componentInstance;
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
      component.items = [{ value: 'item 1' }, itemToBeSelected, { value: 'item 3' }];

      component.onItemTap(itemToBeSelected);

      expect(component.itemSelect.emit).toHaveBeenCalledTimes(1);
      expect(component.itemSelect.emit).toHaveBeenCalledWith(itemToBeSelected);
    });
  });

  describe('sections', () => {
    it('should be disabled if no section callback is defined', () => {
      fixture.detectChanges();

      expect(component.isSectionsEnabled).toBeFalsy();
    });

    it('should be enabled if a section callback is defined', () => {
      testHost.sectionNameResolver = () => 'this is a test';

      fixture.detectChanges();

      expect(component.isSectionsEnabled).toBeTruthy();
    });

    it('should render one li element for each item, if the list is not sectioned', () => {
      testHost.items = [1, 2, 3];

      fixture.detectChanges();

      const rootElement: HTMLElement = fixture.debugElement.nativeElement;
      const liElements = rootElement.querySelectorAll('li');

      expect(liElements.length).toEqual(component.items.length);
    });

    it('should render one li element for each item and one for each section, if sections are enabled', () => {
      const sections = ['section 1', 'section 2', 'section 3'];
      testHost.items = [0, 1, 2];
      testHost.sectionNameResolver = (item: any): string => sections[item];

      fixture.detectChanges();

      const rootElement: HTMLElement = fixture.debugElement.nativeElement;
      const sectionElements = rootElement.querySelectorAll('li.section-header');
      const rowElements = rootElement.querySelectorAll('li.row');

      expect(sectionElements.length).toEqual(sections.length);
      expect(rowElements.length).toEqual(component.items.length);
    });
  });

  describe('boundary styling', () => {
    describe('in non-sectioned list', () => {
      beforeEach(() => {
        testHost.items = [1, 2, 3];
        fixture.detectChanges();
      });

      it('should apply "top"-class to first row', () => {
        const rootElement: HTMLElement = fixture.debugElement.nativeElement;
        const topLiElement = rootElement.querySelector('li.row:first-of-type');
        expect(topLiElement.className).toContain('top');
      });

      it('should not apply "top"- nor "bottom"-class to rows in the middle', () => {
        const rootElement: HTMLElement = fixture.debugElement.nativeElement;
        const middleElement = rootElement.querySelector('li.row:nth-child(2)');
        expect(middleElement.className).not.toContain('top');
        expect(middleElement.className).not.toContain('bottom');
      });

      it('should apply "bottom"-class to last row ', () => {
        const rootElement: HTMLElement = fixture.debugElement.nativeElement;
        const bottomLiElement = rootElement.querySelector('li.row:last-of-type');
        expect(bottomLiElement.className).toContain('bottom');
      });

      it('should be able to apply both "top"- and "bottom" classes when there is only a single row', () => {
        testHost.items = [1];
        fixture.detectChanges();

        const rootElement: HTMLElement = fixture.debugElement.nativeElement;
        const liElement = rootElement.querySelector('li');
        expect(liElement.className).toContain('top');
        expect(liElement.className).toContain('bottom');
      });
    });

    describe('in sectioned list', () => {
      beforeEach(() => {
        testHost.sectionNameResolver = (item: number) => (item % 2 === 0 ? 'even' : 'odd');
        testHost.items = [1, 2, 3, 4];
        fixture.detectChanges();
      });

      it('should apply "top"-class to first row of sections', () => {
        const rootElement: HTMLElement = fixture.debugElement.nativeElement;
        const liElements = rootElement.querySelectorAll('li.row');
        expect(liElements[0].className).toContain('top');
        expect(liElements[1].className).not.toContain('top');
        expect(liElements[2].className).toContain('top');
        expect(liElements[3].className).not.toContain('top');
      });

      it('should apply "bottom"-class to last row of sections', () => {
        const rootElement: HTMLElement = fixture.debugElement.nativeElement;
        const liElements = rootElement.querySelectorAll('li.row');
        expect(liElements[0].className).not.toContain('bottom');
        expect(liElements[1].className).toContain('bottom');
        expect(liElements[2].className).not.toContain('bottom');
        expect(liElements[3].className).toContain('bottom');
      });

      it('should be able to apply both "top"- and "bottom" classes when there is only a single row in the section', () => {
        testHost.items = [1, 2];
        fixture.detectChanges();

        const rootElement: HTMLElement = fixture.debugElement.nativeElement;
        const liElements = rootElement.querySelectorAll('li.row');
        expect(liElements[0].className).toContain('top');
        expect(liElements[0].className).toContain('bottom');
        expect(liElements[1].className).toContain('top');
        expect(liElements[1].className).toContain('bottom');
      });
    });
  });

  describe('shape styling', () => {
    beforeEach(() => {
      testHost.items = [1];
    });

    ['square', 'rounded'].forEach((shape: ListShape) => {
      it(`should propogate '${shape}'-shape to "li.row"-elements`, () => {
        testHost.shape = shape;
        fixture.detectChanges();

        const rootElement: HTMLElement = fixture.debugElement.nativeElement;
        const liElement = rootElement.querySelector('li.row');

        expect(liElement.className).toContain(shape);
      });
    });
  });
});
