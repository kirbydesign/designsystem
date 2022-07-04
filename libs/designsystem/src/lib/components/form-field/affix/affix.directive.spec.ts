import { registerLocaleData } from '@angular/common';
import localeDa from '@angular/common/locales/da';
import { Component, LOCALE_ID } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { createDirectiveFactory, SpectatorDirective } from '@ngneat/spectator';

import { InputComponent } from '../input/input.component';

import { InputAffixDirective } from './input-affix.directive';

// tslint:disable-next-line:component-selector
@Component({ selector: 'affix-input-host', template: '' })
class AffixInputHostComponent {
  numericInput = new FormControl('');
}

describe('NumberInputDirective', () => {
  let locale: 'da' | 'en-GB' = 'en-GB';
  let spectator: SpectatorDirective<InputAffixDirective>;

  registerLocaleData(localeDa);

  const createDirective = createDirectiveFactory({
    directive: InputAffixDirective,
    host: AffixInputHostComponent,
    imports: [ReactiveFormsModule],
    declarations: [InputComponent],
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
    spectator = createDirective(`<input kirby-input affix prefix="fo"/>`);
    const instance = spectator.directive;
    expect(instance).toBeDefined();
  });
});
