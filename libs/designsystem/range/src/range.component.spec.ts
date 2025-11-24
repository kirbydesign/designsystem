import { createHostFactory, SpectatorHost } from '@ngneat/spectator';
import { TestHelper } from '@kirbydesign/designsystem/testing';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { fakeAsync, tick } from '@angular/core/testing';
import { RangeComponent } from './range.component';

@Component({
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
class OnPushHostComponent {}

describe('RangeComponent', () => {
  let spectator: SpectatorHost<RangeComponent>;

  const createHost = createHostFactory({
    component: RangeComponent,
    imports: [TestHelper.ionicModuleForTest],
  });

  describe('default', () => {
    beforeEach(() => {
      spectator = createHost('<kirby-range></kirby-range>');
    });

    it('should create', () => {
      expect(spectator.component).toBeTruthy();
    });

    it('should always have a pinFormatter function when pin is set', () => {
      spectator.setHostInput('pin', true);
      expect(spectator.component.pinFormatter).toBeDefined();
    });
  });

  describe('with attributes', () => {
    it('should set aria-label attribute on ion-range', () => {
      spectator = createHost('<kirby-range aria-label="aria-test" ></kirby-range>');
      const ionRangeElement = spectator.query('ion-range');
      expect(ionRangeElement.getAttribute('aria-label')).toEqual('aria-test');
      expect(spectator.element.getAttribute('aria-label')).toBeNull();
    });

    it('should set aria-labelledby attribute on ion-range', () => {
      spectator = createHost('<kirby-range aria-labelledby="aria-test" ></kirby-range>');
      const ionRangeElement = spectator.query('ion-range');
      expect(ionRangeElement.getAttribute('aria-labelledby')).toEqual('aria-test');
      expect(spectator.element.getAttribute('aria-labelledby')).toBeNull();
    });
  });

  describe('when inside host component with ChangeDetectionStrategy.OnPush', () => {
    let spectator: SpectatorHost<RangeComponent, OnPushHostComponent>;
    let formControl: FormControl;
    let ionRange: HTMLIonRangeElement;

    const createHost = createHostFactory({
      component: RangeComponent,
      host: OnPushHostComponent,
      imports: [TestHelper.ionicModuleForTest, ReactiveFormsModule],
    });

    beforeEach(async () => {
      formControl = new FormControl(25);
      spectator = createHost(
        '<kirby-range [formControl]="formControl" [min]="0" [max]="100"></kirby-range>',
        {
          hostProps: {
            formControl,
          },
        }
      );
      ionRange = spectator.query('ion-range');
      await TestHelper.whenReady(ionRange);
    });

    it('should update value when form control value changes', () => {
      expect(spectator.component.value).toBe(25);

      formControl.setValue(75);
      spectator.detectChanges();

      expect(spectator.component.value).toBe(75);
      expect(ionRange.value).toBe(75);
    });

    it('should update disabled state when form control is disabled', () => {
      expect(spectator.component.disabled).toBeFalsy();

      formControl.disable();
      spectator.detectChanges();

      expect(spectator.component.disabled).toBeTruthy();
      expect(ionRange.disabled).toBeTruthy();
    });

    it('should update disabled state when form control is enabled', () => {
      formControl.disable();
      spectator.detectChanges();
      expect(spectator.component.disabled).toBeTruthy();

      formControl.enable();
      spectator.detectChanges();

      expect(spectator.component.disabled).toBeFalsy();
      expect(ionRange.disabled).toBeFalsy();
    });

    it('should mark component for check when value is written', () => {
      const cdr = spectator.component['cdr'];
      spyOn(cdr, 'markForCheck');

      spectator.component.writeValue(10);

      expect(cdr.markForCheck).toHaveBeenCalledTimes(1);
    });

    describe('setDisabledState()', () => {
      it('should mark component for check when disabled state is set to true', () => {
        const cdr = spectator.component['cdr'];
        spyOn(cdr, 'markForCheck');

        spectator.component.setDisabledState(true);

        expect(cdr.markForCheck).toHaveBeenCalledTimes(1);
      });

      it('should mark component for check when disabled state is set to false', () => {
        const cdr = spectator.component['cdr'];
        spectator.component.disabled = true;
        spyOn(cdr, 'markForCheck');

        spectator.component.setDisabledState(false);

        expect(cdr.markForCheck).toHaveBeenCalledTimes(1);
      });
    });
  });
});
