import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  createComponentFactory,
  createHostFactory,
  Spectator,
  SpectatorHost,
} from '@ngneat/spectator';
import { TestHelper } from '@kirbydesign/designsystem/testing';
import { DesignTokenHelper } from '@kirbydesign/designsystem/helpers';
import { ToggleComponent } from './toggle.component';

const size = DesignTokenHelper.size;

@Component({
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
class OnPushHostComponent {}

describe('ToggleComponent', () => {
  let spectator: Spectator<ToggleComponent>;
  let ionToggle: HTMLIonToggleElement;

  const createComponent = createComponentFactory({
    component: ToggleComponent,
    imports: [TestHelper.ionicModuleForTest],
  });

  beforeEach(() => {
    spectator = createComponent();
    ionToggle = spectator.query('ion-toggle');
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should have correct size', async () => {
    await TestHelper.whenReady(ionToggle);
    expect(ionToggle).toHaveComputedStyle({
      height: size('l'),
    });
  });

  describe('checked', () => {
    it('should not be checked by default', () => {
      expect(spectator.component.checked).toBeFalse();
    });

    it('should not be rendered as checked by default', () => {
      expect(ionToggle.checked).toBeFalse();
    });

    it('should be rendered as checked when checked is set to true', () => {
      spectator.setInput({ checked: true });

      expect(ionToggle.checked).toBeTrue();
    });
  });

  describe('disabled', () => {
    it('should not be disabled by default', () => {
      expect(spectator.component.disabled).toBeFalse();
    });

    it('ion-toggle should not be rendered as disabled by default', () => {
      expect(ionToggle.disabled).toBeFalse();
    });

    it('should be rendered as disabled when disabled is set to true', () => {
      spectator.setInput({ disabled: true });

      expect(ionToggle.disabled).toBeTrue();
    });
  });

  describe('implementing ControlValueAccessor interface', () => {
    it('should update the value when writeValue is called', () => {
      spectator.component.writeValue(true);

      expect(spectator.component.checked).toBeTrue();
    });

    it('should call the registered onChange function when toggle is clicked', async () => {
      const onChangeSpy = jasmine.createSpy('onChange');
      const newValue = true;
      spectator.component.registerOnChange(onChangeSpy);
      await TestHelper.whenReady(ionToggle);

      spectator.click('ion-toggle');

      expect(onChangeSpy).toHaveBeenCalledOnceWith(newValue);
    });

    it('should call the registered onTouched function when blurred', () => {
      const onTouchedSpy = jasmine.createSpy('onTouched');
      spectator.component.registerOnTouched(onTouchedSpy);
      spectator.focus('ion-toggle');

      spectator.blur('ion-toggle');

      expect(onTouchedSpy).toHaveBeenCalledTimes(1);
    });

    it('should update the disabled state when setDisabledState is called', () => {
      spectator.component.setDisabledState(true);

      expect(spectator.component.disabled).toBeTrue();
    });
  });
});

describe('ToggleComponent with aria label', () => {
  const createHost = createHostFactory({
    component: ToggleComponent,
    imports: [TestHelper.ionicModuleForTest],
  });

  let spectator: SpectatorHost<ToggleComponent>;
  let ionToggle: HTMLIonToggleElement;

  beforeEach(async () => {
    spectator = createHost(
      '<kirby-toggle [attr.aria-label]="ariaLabel">{{ text }}</kirby-toggle>',
      {
        hostProps: {
          text: 'test',
          ariaLabel: 'my aria label',
        },
      }
    );
    ionToggle = spectator.query('ion-toggle');
    await TestHelper.whenReady(ionToggle);
  });

  it('should have same click area (.hidden-label element) size as ion-toggle', () => {
    const hiddenLabel: HTMLElement = ionToggle.querySelector('.hidden-label');
    const hiddenLabelBoundingRect = hiddenLabel.getBoundingClientRect();
    const ionToggleBoundingRect = ionToggle.getBoundingClientRect();

    expect(hiddenLabelBoundingRect.height).toBe(ionToggleBoundingRect.height);
    expect(hiddenLabelBoundingRect.width).toBe(ionToggleBoundingRect.width);
    expect(hiddenLabelBoundingRect.left).toBe(ionToggleBoundingRect.left);
    expect(hiddenLabelBoundingRect.right).toBe(ionToggleBoundingRect.right);
    expect(hiddenLabelBoundingRect.top).toBe(ionToggleBoundingRect.top);
    expect(hiddenLabelBoundingRect.bottom).toBe(ionToggleBoundingRect.bottom);
  });
});

describe('ToggleComponent when inside host component with ChangeDetectionStrategy.OnPush', () => {
  let spectator: SpectatorHost<ToggleComponent, OnPushHostComponent>;
  let formControl: FormControl;
  let ionToggle: HTMLIonToggleElement;

  const createHost = createHostFactory({
    component: ToggleComponent,
    host: OnPushHostComponent,
    imports: [TestHelper.ionicModuleForTest, ReactiveFormsModule],
  });

  beforeEach(async () => {
    formControl = new FormControl(false);
    spectator = createHost('<kirby-toggle [formControl]="formControl"></kirby-toggle>', {
      hostProps: {
        formControl,
      },
    });
    ionToggle = spectator.query('ion-toggle');
    await TestHelper.whenReady(ionToggle);
  });

  it('should update value when form control value changes', () => {
    expect(spectator.component.checked).toBeFalse();

    formControl.setValue(true);
    spectator.detectChanges();

    expect(spectator.component.checked).toBeTrue();
    expect(ionToggle.checked).toBeTrue();
  });

  it('should update disabled state when form control is disabled', () => {
    expect(ionToggle.disabled).toBeFalsy();

    formControl.disable();
    spectator.detectChanges();

    expect(ionToggle.disabled).toBeTruthy();
  });

  it('should update disabled state when form control is enabled', () => {
    formControl.disable();
    spectator.detectChanges();
    expect(ionToggle.disabled).toBeTruthy();

    formControl.enable();
    spectator.detectChanges();

    expect(ionToggle.disabled).toBeFalsy();
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
