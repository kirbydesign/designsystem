import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCellComponent } from './list-cell.component';

describe('ListCellComponent', () => {
  let component: ListCellComponent;
  let fixture: ComponentFixture<ListCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ListCellComponent],
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
    it('should have initial value', () => {
      const expected = '100%';

      expect(component.getWidth()).toBe(expected);
    });

    it('should be transformed to percentage', () => {
      const expected = /^\d*\.?\d*%$/; // any positive number prefixed with '%'

      expect(component.getWidth()).toMatch(expected);
    });

    it('should be doubled', () => {
      component.width = 2;
      const expected = '200%';

      expect(component.getWidth()).toBe(expected);
    });

    it('should be one tenth', () => {
      component.width = 0.1;
      const expected = '10%';

      expect(component.getWidth()).toBe(expected);
    });

    it('should not fail when null', () => {
      component.width = null;
      const expected = '100%';

      expect(component.getWidth()).toBe(expected);
    });

    it('should not fail when negative', () => {
      component.width = -1;
      const expected = '100%';

      expect(component.getWidth()).toBe(expected);
    });
  });

  describe('horisontalAlignment', () => {
    it('should have initial value', () => {
      const expected = 'flex-start';

      expect(component.getHorisontalAlignment()).toBe(expected);
    });

    it('left should be transformed to flex-start', () => {
      component.horisontalAlignment = 'left';
      const expected = 'flex-start';

      expect(component.getHorisontalAlignment()).toBe(expected);
    });

    it('center should not be transformed', () => {
      component.horisontalAlignment = 'center';
      const expected = 'center';

      expect(component.getHorisontalAlignment()).toBe(expected);
    });

    it('right should be transformed to flex-end', () => {
      component.horisontalAlignment = 'right';
      const expected = 'flex-end';

      expect(component.getHorisontalAlignment()).toBe(expected);
    });

    it('space-between should not be transformed', () => {
      component.horisontalAlignment = 'space-between';
      const expected = 'space-between';

      expect(component.getHorisontalAlignment()).toBe(expected);
    });

    it('space-around should not be transformed', () => {
      component.horisontalAlignment = 'space-around';
      const expected = 'space-around';

      expect(component.getHorisontalAlignment()).toBe(expected);
    });

    it('should not fail on null', () => {
      component.horisontalAlignment = null;
      const expected = 'flex-start';

      expect(component.getHorisontalAlignment()).toBe(expected);
    });
  });

  describe('verticalAlignment', () => {
    it('should be initialized', () => {
      const expected = 'center';

      expect(component.getVerticalAlignment()).toBe(expected);
    });

    it('top should be transformed to flex-start', () => {
      component.verticalAlignment = 'top';
      const expected = 'flex-start';

      expect(component.getVerticalAlignment()).toBe(expected);
    });

    it('center should not be transformed', () => {
      component.verticalAlignment = 'center';
      const expected = 'center';

      expect(component.getVerticalAlignment()).toBe(expected);
    });

    it('bottom should be transformed to flex-end', () => {
      component.verticalAlignment = 'bottom';
      const expected = 'flex-end';

      expect(component.getVerticalAlignment()).toBe(expected);
    });

    it('stretch should not be transformed', () => {
      component.verticalAlignment = 'stretch';
      const expected = 'stretch';

      expect(component.getVerticalAlignment()).toBe(expected);
    });

    it('baseline should not be transformed', () => {
      component.verticalAlignment = 'baseline';
      const expected = 'baseline';

      expect(component.getVerticalAlignment()).toBe(expected);
    });

    it('should not fail on null', () => {
      component.verticalAlignment = null;
      const expected = 'center';

      expect(component.getVerticalAlignment()).toBe(expected);
    });
  });
});
