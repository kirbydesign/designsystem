import { registerLocaleData } from '@angular/common';
import localeDa from '@angular/common/locales/da';
import { Component, LOCALE_ID } from '@angular/core';
import { ReactiveFormsModule, UntypedFormControl } from '@angular/forms';
import { createDirectiveFactory, SpectatorDirective } from '@ngneat/spectator';

import { InputComponent } from '../../input/input.component';

import { DecimalMaskDirective } from './decimal-mask.directive';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'numeric-input-host',
  template: '',
  standalone: false,
})
class NumericInputHostComponent {
  // Initialize with null to simulate real-world scenario where form control starts empty
  numericInput = new UntypedFormControl(null);
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

    describe('with padPrecisionDigits', () => {
      describe('and en-GB locale', () => {
        locale = 'en-GB';
        it('should not pad fractional digits when padPrecisionDigits is not set', () => {
          spectator = createDirective(`<input kirby-input kirby-decimal-mask type="number" />`);
          spectator.typeInElement('0.1', spectator.element);
          expect(spectator.element).toHaveValue('0.1');
        });

        it('should pad to the default precision when padPrecisionDigits is true', () => {
          locale = 'en-GB';
          spectator = createDirective(
            `<input kirby-input kirby-decimal-mask type="number" [padPrecisionDigits]="true" />`
          );
          spectator.typeInElement('0.1', spectator.element);
          expect(spectator.element).toHaveValue('0.10');
        });

        it('should correctly pad input value to the specified precision', () => {
          locale = 'en-GB';
          spectator = createDirective(
            `<input kirby-input kirby-decimal-mask type="number" [padPrecisionDigits]="true" precision="3" />`
          );
          spectator.typeInElement('0.1', spectator.element);
          expect(spectator.element).toHaveValue('0.100');
        });

        it('should pad fractional digits when none are entered', () => {
          locale = 'en-GB';
          spectator = createDirective(
            `<input kirby-input kirby-decimal-mask type="number" [padPrecisionDigits]="true" precision="2" />`
          );

          spectator.typeInElement('1', spectator.element);

          expect(spectator.element).toHaveValue('1.00');
        });

        it('should correctly set value programmatically with precision 2', () => {
          locale = 'en-GB';
          spectator = createDirective(
            `<input kirby-input kirby-decimal-mask type="number" [formControl]="numericInput" [padPrecisionDigits]="true" precision="2" />`
          );
          const numericInput = spectator.hostComponent['numericInput'];

          expect(numericInput.value).toBeNull();
          expect(spectator.element).toHaveValue('');

          numericInput.setValue(1);

          expect(spectator.element).toHaveValue('1.00');
        });

        it('should correctly set value programmatically with precision 4', () => {
          locale = 'en-GB';
          spectator = createDirective(
            `<input kirby-input kirby-decimal-mask type="number" [formControl]="numericInput" [padPrecisionDigits]="true" precision="4" />`
          );
          const numericInput = spectator.hostComponent['numericInput'];

          expect(spectator.element).toHaveValue('');

          numericInput.setValue(1);

          expect(spectator.element).toHaveValue('1.0000');
        });
      });

      describe('and DA locale', () => {
        it('should not pad fractional digits when padPrecisionDigits is not set', () => {
          locale = 'da';
          spectator = createDirective(`<input kirby-input kirby-decimal-mask type="number" />`);
          spectator.typeInElement('0,1', spectator.element);

          expect(spectator.element).toHaveValue('0,1');
        });

        it('should pad to the default precision when padPrecisionDigits is true', () => {
          locale = 'da';
          spectator = createDirective(
            `<input kirby-input kirby-decimal-mask type="number" [padPrecisionDigits]="true" />`
          );
          spectator.typeInElement('0,1', spectator.element);
          expect(spectator.element).toHaveValue('0,10');
        });

        it('should correctly pad input value to the specified precision', () => {
          locale = 'da';
          spectator = createDirective(
            `<input kirby-input kirby-decimal-mask type="number" [padPrecisionDigits]="true" precision="3" />`
          );
          spectator.typeInElement('0,1', spectator.element);
          expect(spectator.element).toHaveValue('0,100');
        });

        it('should pad fractional digits when none are entered', () => {
          locale = 'da';
          spectator = createDirective(
            `<input kirby-input kirby-decimal-mask type="number" [padPrecisionDigits]="true" precision="2" />`
          );

          spectator.typeInElement('1', spectator.element);

          expect(spectator.element).toHaveValue('1,00');
        });

        it('should correctly set value programmatically with precision 2', () => {
          locale = 'da';
          spectator = createDirective(
            `<input kirby-input kirby-decimal-mask type="number" [formControl]="numericInput" [padPrecisionDigits]="true" precision="2" />`
          );
          const numericInput = spectator.hostComponent['numericInput'];

          expect(spectator.element).toHaveValue('');

          numericInput.setValue(1);

          expect(spectator.element).toHaveValue('1,00');
        });

        it('should correctly set value programmatically with precision 4', () => {
          locale = 'da';
          spectator = createDirective(
            `<input kirby-input kirby-decimal-mask type="number" [formControl]="numericInput" [padPrecisionDigits]="true" precision="4" />`
          );
          const numericInput = spectator.hostComponent['numericInput'];

          expect(spectator.element).toHaveValue('');

          numericInput.setValue(1);

          expect(spectator.element).toHaveValue('1,0000');
        });

        it('should correctly set value programmatically after clearing a previous value', () => {
          locale = 'da';
          spectator = createDirective(
            `<input kirby-input kirby-decimal-mask type="number" [formControl]="numericInput" [padPrecisionDigits]="true" precision="4" />`
          );
          const numericInput = spectator.hostComponent['numericInput'];

          numericInput.setValue(5);

          expect(spectator.element).toHaveValue('5,0000');

          numericInput.setValue(null);

          expect(spectator.element).toHaveValue('');

          numericInput.setValue(4);

          expect(spectator.element).toHaveValue('4,0000');
        });
      });
    });
  });

  describe('reactive form', () => {
    it('should be able to receive value with locale radix point from form-control', () => {
      locale = 'en-GB';
      spectator = createDirective(
        `<input kirby-input kirby-decimal-mask type="number" [formControl]="numericInput" />`
      );
      // @ts-ignore
      const numericInput = spectator.hostComponent.numericInput;
      numericInput.setValue('1000,12');
      expect(numericInput.value).toEqual('1000.12');
    });

    it('should be able to receive value as number from form-control', () => {
      locale = 'en-GB';
      spectator = createDirective(
        `<input kirby-input kirby-decimal-mask type="number" [formControl]="numericInput" />`
      );
      // @ts-ignore
      const numericInput = spectator.hostComponent.numericInput;
      numericInput.setValue('1000.12');
      expect(numericInput.value).toEqual('1000.12');
    });

    it('should replace radix point recieved from form-control to locale radix point', () => {
      locale = 'en-GB';
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
});
