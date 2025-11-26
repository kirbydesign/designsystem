import { ChangeDetectionStrategy, Component } from '@angular/core';
import { createHostFactory, SpectatorHost } from '@ngneat/spectator';

import { ButtonComponent } from '@kirbydesign/designsystem/button';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ToggleButtonComponent } from './toggle-button.component';

@Component({
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
class OnPushHostComponent {}

describe('ToggleButtonComponent', () => {
  let spectator: SpectatorHost<ToggleButtonComponent>;
  const createHost = createHostFactory({
    component: ToggleButtonComponent,
    imports: [ButtonComponent],
  });

  describe('by default', () => {
    beforeEach(() => {
      spectator = createHost(`<kirby-toggle-button>
        <button kirby-button unchecked>Unchecked</button>
        <button kirby-button checked>Checked</button>
      </kirby-toggle-button>`);
    });
    it('should toggle checked state on click', () => {
      spectator.component.checked = false;

      spectator.click('button');

      expect(spectator.component.checked).toBe(true);
    });

    it('should emit checkChanged event on click', () => {
      let checkChangedCalled;
      spectator.output('checkChanged').subscribe((result) => (checkChangedCalled = result));

      spectator.click('button');

      expect(checkChangedCalled).toBe(true);
    });
  });

  describe('when nested button is disabled', () => {
    beforeEach(() => {
      spectator = createHost(`<kirby-toggle-button>
        <button kirby-button unchecked [disabled]="true">Unchecked</button>
        <button kirby-button checked [disabled]="true">Checked</button>
      </kirby-toggle-button>`);
    });

    it('should not emit change-event on click', () => {
      let checkChangedCalled;
      spectator.output('checkChanged').subscribe((result) => (checkChangedCalled = result));

      spectator.click('button');

      expect(checkChangedCalled).toBe(undefined);
    });

    it('should not toggle checked state on click', () => {
      spectator.component.checked = true;

      spectator.click('button');

      expect(spectator.component.checked).toBe(true);
    });
  });

  describe('in a form', () => {
    let spectator: SpectatorHost<ToggleButtonComponent>;
    let formGroup = new FormGroup({
      toggleState: new FormControl(false),
    });

    const createHost = createHostFactory({
      component: ToggleButtonComponent,
      imports: [ButtonComponent, ReactiveFormsModule],
    });

    beforeEach(() => {
      formGroup = new FormGroup({
        toggleState: new FormControl(false),
      });
      spectator = createHost(
        `<form [formGroup]="formGroup">
          <kirby-toggle-button [formControl]="formGroup.controls.toggleState">
            <button kirby-button unchecked>Unchecked</button>
            <button kirby-button checked>Checked</button>
          </kirby-toggle-button>
        </form>`,
        {
          hostProps: { formGroup },
          detectChanges: true,
        }
      );
    });

    it('should update form control value when clicked', () => {
      spectator.click('button');
      expect(formGroup.controls.toggleState.value).toBe(true);

      spectator.click('button');
      expect(formGroup.controls.toggleState.value).toBe(false);
      expect(formGroup.controls.toggleState.touched).toBe(true);
      expect(formGroup.controls.toggleState.dirty).toBe(true);
    });

    it('should update UI when form control value changes', () => {
      formGroup.controls.toggleState.setValue(true);
      spectator.detectChanges();

      expect(spectator.query('button[checked]')).toBeVisible();
      expect(spectator.query('button[unchecked]')).not.toBeVisible();

      formGroup.controls.toggleState.setValue(false);
      spectator.detectChanges();

      expect(spectator.query('button[checked]')).not.toBeVisible();
      expect(spectator.query('button[unchecked]')).toBeVisible();
    });

    it('should emit blur event on blur', () => {
      spectator.component.checked = true;
      spectator.component.onFocusOut();

      expect(formGroup.controls.toggleState.touched).toBe(true);
    });
  });

  describe('when inside host component with ChangeDetectionStrategy.OnPush', () => {
    let spectator: SpectatorHost<ToggleButtonComponent, OnPushHostComponent>;
    let formControl: FormControl;

    const createHost = createHostFactory({
      component: ToggleButtonComponent,
      host: OnPushHostComponent,
      imports: [ButtonComponent, ReactiveFormsModule],
    });

    beforeEach(() => {
      formControl = new FormControl(false);
      spectator = createHost(
        `<kirby-toggle-button [formControl]="formControl">
          <button kirby-button unchecked>Unchecked</button>
          <button kirby-button checked>Checked</button>
        </kirby-toggle-button>`,
        {
          hostProps: {
            formControl,
          },
        }
      );
    });

    it('should update value when form control value changes', () => {
      expect(spectator.component.checked).toBeFalse();

      formControl.setValue(true);
      spectator.detectChanges();

      expect(spectator.component.checked).toBeTrue();
      expect(spectator.query('button[checked]')).toBeVisible();
      expect(spectator.query('button[unchecked]')).not.toBeVisible();
    });

    it('should update disabled state when form control is disabled', () => {
      const button = spectator.query('button[kirby-button]');
      expect(button).not.toHaveAttribute('disabled');

      formControl.disable();
      spectator.detectChanges();

      expect(button).toHaveAttribute('disabled');
    });

    it('should update disabled state when form control is enabled', () => {
      const button = spectator.query('button[kirby-button]');
      formControl.disable();
      spectator.detectChanges();
      expect(button).toHaveAttribute('disabled');

      formControl.enable();
      spectator.detectChanges();

      expect(button).not.toHaveAttribute('disabled');
    });

    it('should mark component for check when value is written', () => {
      const cdr = spectator.component['cdr'];
      spyOn(cdr, 'markForCheck');

      spectator.component.writeValue(true);

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
        spectator.component.setDisabledState(true);
        spyOn(cdr, 'markForCheck');

        spectator.component.setDisabledState(false);

        expect(cdr.markForCheck).toHaveBeenCalledTimes(1);
      });
    });
  });
});
