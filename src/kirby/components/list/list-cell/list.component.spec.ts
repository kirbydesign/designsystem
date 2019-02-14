import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCellComponent } from './list-cell.component';

describe('ListCellComponent', () => {
  let component: ListCellComponent;
  let fixture: ComponentFixture<ListCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ListCellComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('width', () => {
    it('should be initialized', () => {
      const expected = 1;
      expect(component.width).toBe(expected);
    });

    it('should be transformed to percentage', () => {
      const expected = '100%';
      expect(component.getWidth()).toBe(expected);
    });

    it('should be calculated', () => {
      component.width = 2;
      let expected = '200%';
      expect(component.getWidth()).toBe(expected);
      component.width = 0.1;
      expected = '10%';
      expect(component.getWidth()).toBe(expected);
    });

    it('should not fail on invalid input', () => {
      component.width = null;
      const expected = '100%';
      expect(component.getWidth()).toBe(expected);
      component.width = -1;
      expect(component.getWidth()).toBe(expected);
    });
  });

  describe('horisontalAlignment', () => {
    it('should be initialized', () => {
      expect(component.horisontalAlignment).toBe('left');
    });

    it('should be transformed to flexbox alignment', () => {
      component.horisontalAlignment = 'left';
      let expected = 'flex-start';
      expect(component.getAlignItems()).toBe(expected);
      component.horisontalAlignment = 'center';
      expected = 'center';
      expect(component.getAlignItems()).toBe(expected);
      component.horisontalAlignment = 'right';
      expected = 'flex-end';
      expect(component.getAlignItems()).toBe(expected);
    });

    it('should not fail on invalid input', () => {
      component.horisontalAlignment = null;
      const expected = 'flex-start';
      expect(component.getAlignItems()).toBe(expected);
    });
  });

  describe('verticalAlignment', () => {
    it('should be initialized', () => {
      const expected = 'center';
      expect(component.verticalAlignment).toBe(expected);
    });

    it('should be transformed to flexbox justfy content', () => {
      component.verticalAlignment = 'top';
      let expected = 'flex-start';
      expect(component.getJustifyContent()).toBe(expected);
      component.verticalAlignment = 'center';
      expected = 'center';
      expect(component.getJustifyContent()).toBe(expected);
      component.verticalAlignment = 'bottom';
      expected = 'flex-end';
      expect(component.getJustifyContent()).toBe(expected);
    });

    it('should not fail on invalid input', () => {
      component.verticalAlignment = null;
      const expected = 'center';
      expect(component.getAlignItems()).toBe(expected);
    });
  });
});
