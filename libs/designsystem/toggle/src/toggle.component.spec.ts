import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { TestHelper } from '@kirbydesign/designsystem/testing';

import { ToggleComponent } from './toggle.component';

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
