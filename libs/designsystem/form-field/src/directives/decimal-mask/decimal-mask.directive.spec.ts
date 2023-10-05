import { registerLocaleData } from '@angular/common';
import localeDa from '@angular/common/locales/da';
import { Component, LOCALE_ID } from '@angular/core';
import { ReactiveFormsModule, UntypedFormControl } from '@angular/forms';
import { createDirectiveFactory, SpectatorDirective } from '@ngneat/spectator';

import { InputComponent } from '../../input/input.component';

import { DecimalMaskDirective } from './decimal-mask.directive';

// eslint-disable-next-line @angular-eslint/component-selector
@Component({ selector: 'numeric-input-host', template: '' })
class NumericInputHostComponent {
  numericInput = new UntypedFormControl('');
}

describe('NumberInputDirective', () => {
  let locale: 'da' | 'en-GB' = 'en-GB';
  let spectator: SpectatorDirective<DecimalMaskDirective>;

  registerLocaleData(localeDa);

  const createDirective = createDirectiveFactory({
    directive: DecimalMaskDirective,
    host: NumericInputHostComponent,
    imports: [ReactiveFormsModule, InputComponent],
    providers: [
      {
        provide: LOCALE_ID,
        useFactory: () => {
          return locale;
        },
      },
    ],
  });

  it('should get the instance', () => {
    spectator = createDirective(`<input kirby-input kirby-decimal-mask type="number" />`);
    const instance = spectator.directive;
    expect(instance).toBeDefined();
  });

  describe('grouping seperator', () => {
    it('should be "," if locale is EN', () => {
      locale = 'en-GB';
      spectator = createDirective(`<input kirby-input kirby-decimal-mask type="number" />`);
      spectator.typeInElement('1000', spectator.element);
      expect(spectator.element).toHaveValue('1,000');
    });

    it('should be "." if locale is DA', () => {
      locale = 'da';
      spectator = createDirective(`<input kirby-input kirby-decimal-mask type="number" />`);
      spectator.typeInElement('1000', spectator.element);
      expect(spectator.element).toHaveValue('1.000');
    });

    it('should be disabled when [disableGroupSeperator] is added wihtout a value', () => {
      locale = 'en-GB';
      spectator = createDirective(
        `<input kirby-input kirby-decimal-mask type="number" disableGroupSeperator />`
      );
      spectator.typeInElement('1000', spectator.element);
      expect(spectator.element).toHaveValue('1000');
    });

    it('should be disabled when [disableGroupSeperator="true"] is added', () => {
      locale = 'en-GB';
      spectator = createDirective(
        `<input kirby-input kirby-decimal-mask type="number" disableGroupSeperator="true" />`
      );
      spectator.typeInElement('1000', spectator.element);
      expect(spectator.element).toHaveValue('1000');
    });

    it('should be not be disabled when [disableGroupSeperator="false"] is added', () => {
      locale = 'en-GB';
      spectator = createDirective(
        `<input kirby-input kirby-decimal-mask type="number" disableGroupSeperator="false" />`
      );
      spectator.typeInElement('1000', spectator.element);
      expect(spectator.element).toHaveValue('1,000');
    });
  });

  describe('radix point', () => {
    it('should be "." if locale is EN', () => {
      locale = 'en-GB';
      spectator = createDirective(`<input kirby-input kirby-decimal-mask type="number" />`);
      expect(spectator.directive.radixPoint).toEqual('.');
    });

    it('should be "," if locale is DA', () => {
      locale = 'da';
      spectator = createDirective(`<input kirby-input kirby-decimal-mask type="number" />`);
      expect(spectator.directive.radixPoint).toEqual(',');
    });

    it('should add leading zero, if user just types radix point symbol', () => {
      locale = 'en-GB';
      spectator = createDirective(`<input kirby-input kirby-decimal-mask type="number" />`);
      spectator.typeInElement('.1', spectator.element);
      expect(spectator.element).toHaveValue('0.1');
    });
  });

  describe('fractional digits', () => {
    it('should be 2 as default', () => {
      locale = 'en-GB';
      spectator = createDirective(`<input kirby-input kirby-decimal-mask type="number" />`);
      spectator.typeInElement('0.123', spectator.element);
      expect(spectator.element).toHaveValue('0.12');
    });

    it('should be possible to configure desired amount of fractions digits', () => {
      locale = 'en-GB';
      spectator = createDirective(
        `<input kirby-input kirby-decimal-mask type="number" precision="3" />`
      );
      spectator.typeInElement('0,123', spectator.element);
      expect(spectator.element).toHaveValue('0,123');
    });

    it('should be possible to disallow fractional digits', () => {
      locale = 'en-GB';
      spectator = createDirective(
        `<input kirby-input kirby-decimal-mask type="number" precision="0" />`
      );
      spectator.typeInElement('0.123', spectator.element);
      expect(spectator.element).toHaveValue('0');
    });
  });

  describe('reactive form', () => {
    it('should be able to receive value with locale radix point from form-control', () => {
      locale = 'da';
      spectator = createDirective(
        `<input kirby-input kirby-decimal-mask type="number" [formControl]="numericInput" />`
      );
      // @ts-ignore
      const numericInput = spectator.hostComponent.numericInput;
      numericInput.setValue('1000,12');
      expect(numericInput.value).toEqual('1000.12');
    });

    it('should be able to receive value as number from form-control', () => {
      spectator = createDirective(
        `<input kirby-input kirby-decimal-mask type="number" [formControl]="numericInput" />`
      );
      // @ts-ignore
      const numericInput = spectator.hostComponent.numericInput;
      numericInput.setValue('1000.12');
      expect(numericInput.value).toEqual('1000.12');
    });

    it('should replace radix point recieved from form-control to locale radix point', () => {
      spectator = createDirective(
        `<input kirby-input kirby-decimal-mask type="number" [formControl]="numericInput" />`
      );
      // @ts-ignore
      const numericInput = spectator.hostComponent.numericInput;
      numericInput.setValue('1000.12');
      expect(numericInput.value).toEqual('1000.12');
    });

    it('should update form value, on change', () => {
      locale = 'en-GB';
      spectator = createDirective(
        `<input kirby-input kirby-decimal-mask type="number" [formControl]="numericInput" />`
      );
      spectator.typeInElement('1,000.12', spectator.element);

      // @ts-ignore
      const numericInput = spectator.hostComponent.numericInput;
      expect(numericInput.value).toEqual('1000.12');
    });
  });

  describe('negative numbers', () => {
    it('should not allow negative numbers as default', () => {
      spectator = createDirective(`<input kirby-input kirby-decimal-mask type="number" />`);
      spectator.typeInElement('-', spectator.element);
      expect(spectator.element).toHaveValue('');
    });

    it('should not allow negative numbers if "allowMinus" is set to false', () => {
      spectator = createDirective(
        `<input kirby-input kirby-decimal-mask type="number" [allowMinus]="false" />`
      );
      spectator.typeInElement('-', spectator.element);
      expect(spectator.element).toHaveValue('');
    });

    it('should allow negative numbers, if min. is a negative number, even though allowMinus is set to false', () => {
      spectator = createDirective(
        `<input kirby-input kirby-decimal-mask type="number" min="-100" [allowMinus]="false" />`
      );
      spectator.typeInElement('-', spectator.element);
      expect(spectator.element).toHaveValue('-');
    });

    it('should allow negative numbers, if "allowMinus" is set to true', () => {
      spectator = createDirective(
        `<input kirby-input kirby-decimal-mask type="number" [allowMinus]="true" />`
      );
      spectator.typeInElement('-', spectator.element);
      expect(spectator.element).toHaveValue('-');
    });
  });

  describe('maxlength', () => {
    it('should restrict input according to maxlength', () => {
      locale = 'en-GB';
      spectator = createDirective(
        `<input kirby-input kirby-decimal-mask type="number" maxlength="4" precision="0" />`
      );
      spectator.typeInElement('10000', spectator.element);
      expect(spectator.element).toHaveValue('9,999');
    });

    it('should disable fractional digits', () => {
      locale = 'en-GB';
      spectator = createDirective(
        `<input kirby-input kirby-decimal-mask type="number" maxlength="4" />`
      );
      spectator.typeInElement('10000.88', spectator.element);
      expect(spectator.element).toHaveValue('9,999');
    });
  });

  describe('implementing ControlValueAccessor interface', () => {
    describe('when setDisabledState() function is invoked', () => {
      it('should set disabled = false when invoked with false', () => {
        spectator = createDirective(
          `<input kirby-input kirby-decimal-mask type="number" disabled />`
        );

        spectator.directive.setDisabledState(false);

        expect(spectator.element).not.toHaveAttribute('disabled');
        expect((spectator.element as HTMLInputElement).disabled).toBeFalse();
      });

      it('should set disabled = true when invoked with true', () => {
        spectator = createDirective(`<input kirby-input kirby-decimal-mask type="number" />`);

        spectator.directive.setDisabledState(true);

        expect(spectator.element).toHaveAttribute('disabled');
        expect((spectator.element as HTMLInputElement).disabled).toBeTrue();
      });
    });
  });
});
