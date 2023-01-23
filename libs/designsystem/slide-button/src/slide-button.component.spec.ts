import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';

import { SlideButtonComponent } from './slide-button.component';

describe('SlideButtonComponent', () => {
  let component: SlideButtonComponent;
  let fixture: ComponentFixture<SlideButtonComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [SlideButtonComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlideButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onSliderMouseup', () => {
    it('should emit slide done if value is 100', () => {
      spyOn(component.slideDone, 'emit');

      component.value = 100;

      component.onSliderMouseup();
      expect(component.slideDone.emit).toHaveBeenCalled();
    });

    it('should decrease value with 2 if not 100', fakeAsync(() => {
      spyOn(component.slideDone, 'emit');

      const initValue = 99;

      component.value = initValue;

      component.onSliderMouseup();

      tick(1);
      component.ngOnDestroy();
      expect(component.value).toBe(initValue - 2);
    }));
  });

  describe('onSliderValueChange', () => {
    it('should set value and emit change', () => {
      const newVal = 50;

      spyOn(component.slidingPercentageChanged, 'emit');
      component.onSliderValueChange(newVal.toString());

      expect(component.value).toBe(newVal);
      expect(component.slidingPercentageChanged.emit).toHaveBeenCalledWith(newVal);
    });
  });

  describe('onSliderMousedown', () => {
    it('should stop decrement slider value timer', fakeAsync(() => {
      const initVal = 50;
      component.value = initVal;
      component.onSliderMouseup();

      tick(1);

      component.onSliderMousedown();

      expect(component.value).toBe(initVal - 2);
    }));
  });
});
