import { fakeAsync, tick } from '@angular/core/testing';

import { createHostFactory, SpectatorHost } from '@ngneat/spectator';
import { SlideButtonComponent } from './slide-button.component';

describe('SlideButtonComponent', () => {
  let component: SlideButtonComponent;
  let spectator: SpectatorHost<SlideButtonComponent>;

  const createHost = createHostFactory({
    component: SlideButtonComponent,
  });

  beforeEach(() => {
    spectator = createHost(
      `<kirby-slide-button [text]="'slide to confirm'" aria-label="fake-label" aria-labelledby="fake-dom-label"></kirby-slide-button>`
    );
    component = spectator.component;
  });
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
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

  describe('input range', () => {
    it('should not be tabbable', () => {
      const inputRange = spectator.query('input[type="range"]');
      expect(inputRange).toHaveAttribute('tabindex', '-1');
    });
  });

  describe('aria attributes', () => {
    it('should have aria-hidden on the input range', () => {
      const inputRange = spectator.query('input[type="range"]');
      expect(inputRange).toHaveAttribute('aria-hidden', 'true');
    });

    it('should have aria-hidden on the text paragraph', () => {
      const textParagraph = spectator.query('.slide-button-text');
      expect(textParagraph).toHaveAttribute('aria-hidden', 'true');
    });

    it('should have aria-labelledby on the hidden button', () => {
      const hiddenButton = spectator.query('button.kirby-visually-hidden');
      expect(hiddenButton).toHaveAttribute('aria-labelledby', 'fake-dom-label');
    });

    it('should have aria-label on the hidden button', () => {
      const hiddenButton = spectator.query('button.kirby-visually-hidden');
      expect(hiddenButton).toHaveAttribute('aria-label', 'fake-label');
    });
  });
});
