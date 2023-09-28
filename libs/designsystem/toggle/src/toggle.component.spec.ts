import { By } from '@angular/platform-browser';
import * as ionic from '@ionic/angular';
import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { TestHelper } from '@kirbydesign/designsystem/testing';

import { ToggleComponent } from './toggle.component';

describe('ToggleComponent', () => {
  let spectator: Spectator<ToggleComponent>;

  const createComponent = createComponentFactory({
    component: ToggleComponent,
    imports: [TestHelper.ionicModuleForTest],
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  describe('checked', () => {
    it('should not be checked by default', () => {
      expect(spectator.component.checked).toBeFalse();
    });

    it('should not be rendered as checked by default', () => {
      const ionToggle = spectator.debugElement.query(By.directive(ionic.IonToggle));

      expect(ionToggle.componentInstance.checked).toBeFalse();
    });

    it('should be rendered as checked when checked is set to true', () => {
      spectator.setInput({ checked: true });
      const ionToggle = spectator.debugElement.query(By.directive(ionic.IonToggle));

      expect(ionToggle.componentInstance.checked).toBeTrue();
    });
  });

  describe('disabled', () => {
    it('should not be disabled by default', () => {
      expect(spectator.component.disabled).toBeFalse();
    });

    it('should not be rendered as disabled by default', () => {
      const ionToggle = spectator.debugElement.query(By.directive(ionic.IonToggle));

      expect(ionToggle.componentInstance.disabled).toBeFalse();
    });

    it('should be rendered as disabled when disabled is set to true', () => {
      spectator.setInput({ disabled: true });
      const ionToggle = spectator.debugElement.query(By.directive(ionic.IonToggle));

      expect(ionToggle.componentInstance.disabled).toBeTrue();
    });
  });

  describe('implementing ControlValueAccessor interface', () => {
    it('should update the value when writeValue is called', () => {
      const newValue = true;
      spectator.component.writeValue(newValue);
      expect(spectator.component.checked).toBe(newValue);
    });

    it('should call the registered onChange function when onCheckedChange is called', () => {
      const onChangeSpy = jasmine.createSpy('onChange');
      const newValue = true;
      spectator.component.registerOnChange(onChangeSpy);
      spectator.component.onCheckedChange(newValue);
      expect(onChangeSpy).toHaveBeenCalledOnceWith(newValue);
    });

    it('should call the registered onTouched function when onCheckedChange is called', () => {
      const onTouchedSpy = jasmine.createSpy('onTouched');
      spectator.component.registerOnTouched(onTouchedSpy);
      spectator.component._onInactive();
      expect(onTouchedSpy).toHaveBeenCalledTimes(1);
    });
    it('should update the disabled state when setDisabledState is called', () => {
      const isDisabled = true;
      spectator.component.setDisabledState(isDisabled);
      expect(spectator.component.disabled).toBe(isDisabled);
    });
  });
});
