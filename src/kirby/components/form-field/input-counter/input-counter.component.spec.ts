import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputCounterComponent } from './input-counter.component';
import { FormFieldMessageComponent } from '../form-field-message/form-field-message.component';

describe('InputCounterComponent', () => {
  let component: InputCounterComponent;
  let fixture: ComponentFixture<InputCounterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InputCounterComponent, FormFieldMessageComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('when configured with no length', () => {
    it('should not have any text', () => {
      expect(component.text).toBeUndefined();
    });

    it('should render counter correctly', () => {
      expect((fixture.nativeElement as Element).textContent).toEqual('');
    });
  });

  describe('when configured with length and no maxlength', () => {
    const expectedText = '10';
    beforeEach(() => {
      component.length = 10;
      fixture.detectChanges();
    });

    it('should have correct text', () => {
      expect(component.text).toEqual(expectedText);
    });

    it('should render text correctly', () => {
      expect((fixture.nativeElement as Element).textContent).toEqual(expectedText);
    });
  });

  describe('when configured with length and maxlength = 0', () => {
    const expectedText = '10';
    beforeEach(() => {
      component.length = 10;
      component.maxlength = 0;
      fixture.detectChanges();
    });

    it('should have correct text', () => {
      expect(component.text).toEqual(expectedText);
    });

    it('should render text correctly', () => {
      expect((fixture.nativeElement as Element).textContent).toEqual(expectedText);
    });
  });

  describe('when configured with length and maxlength', () => {
    const expectedText = '10/20';
    beforeEach(() => {
      component.length = 10;
      component.maxlength = 20;
      fixture.detectChanges();
    });

    it('should have correct text', () => {
      expect(component.text).toEqual(expectedText);
    });

    it('should render text correctly', () => {
      expect((fixture.nativeElement as Element).textContent).toEqual(expectedText);
    });
  });
});
