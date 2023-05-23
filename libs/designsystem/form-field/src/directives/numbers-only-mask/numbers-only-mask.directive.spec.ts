import { Component } from '@angular/core';
import { ReactiveFormsModule, UntypedFormControl } from '@angular/forms';
import { createDirectiveFactory, SpectatorDirective } from '@ngneat/spectator';
import { InputComponent } from '../../input/input.component';
import { NumbersOnlyMaskDirective } from './numbers-only-mask.directive';

// eslint-disable-next-line @angular-eslint/component-selector
@Component({ selector: 'numeric-input-host', template: '' })
class NumericInputHostComponent {
  numericInput = new UntypedFormControl('');
}

describe('NumbersOnlyMaskDirective', () => {
  let spectator: SpectatorDirective<NumbersOnlyMaskDirective>;

  const createDirective = createDirectiveFactory({
    directive: NumbersOnlyMaskDirective,
    host: NumericInputHostComponent,
    imports: [ReactiveFormsModule, InputComponent],
  });

  beforeEach(() => {
    spectator = createDirective(
      `<input type="number" kirby-input kirby-numbers-only-mask type="number" [formControl]="numericInput"/>`
    );
  });

  it('should get the instance', () => {
    const instance = spectator.directive;

    expect(instance).toBeDefined();
  });

  describe('numbers', () => {
    it('should allow all numbers from 0-9', () => {
      spectator.typeInElement('0123456789', spectator.element);

      expect(spectator.element).toHaveValue('0123456789');
    });
  });

  const allowedCharacters = 'e.,+-';

  describe('allowed characters', () => {
    for (const char of allowedCharacters) {
      it(`should allow the character '${char}'`, () => {
        spectator.typeInElement(char, spectator.element);

        expect(spectator.element).toHaveValue(char);
      });
    }
  });

  const letters = 'abcdfghijklmnopqrstuvwxyz';

  describe('letters', () => {
    for (const letter of letters) {
      it(`should not allow lowercase '${letter}'`, () => {
        spectator.typeInElement(letter, spectator.element);

        expect(spectator.element).toHaveValue('');
      });

      it(`should not allow uppercase '${letter}'`, () => {
        const upperCaseLetter = letter.toUpperCase();

        spectator.typeInElement(upperCaseLetter, spectator.element);

        expect(spectator.element).toHaveValue('');
      });
    }

    describe('reactive form', () => {
      it('should be able to receive value as number from form-control', () => {
        // @ts-ignore
        const numericInput = spectator.hostComponent.numericInput;
        numericInput.setValue('123');
        expect(numericInput.value).toEqual('123');
      });

      it('should be able to filter out letters from form-control', () => {
        // @ts-ignore
        const numericInput = spectator.hostComponent.numericInput;
        numericInput.setValue('20c23n');
        expect(numericInput.value).toEqual('2023');
      });

      it('should update form value, on change', () => {
        spectator.typeInElement('456', spectator.element);

        // @ts-ignore
        const numericInput = spectator.hostComponent.numericInput;
        expect(numericInput.value).toEqual('456');
      });
    });
  });
});
