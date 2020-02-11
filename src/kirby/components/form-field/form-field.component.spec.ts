import { SpectatorHost, createHostFactory } from '@ngneat/spectator';

import { InputCounterComponent } from './input-counter/input-counter.component';
import { FormFieldComponent } from './form-field.component';
import { FormFieldMessageComponent } from './form-field-message/form-field-message.component';
import { InputComponent } from './input/input.component';
import { TextareaComponent } from './textarea/textarea.component';

describe('FormFieldComponent', () => {
  let spectator: SpectatorHost<FormFieldComponent>;

  const createHost = createHostFactory({
    component: FormFieldComponent,
    declarations: [
      FormFieldComponent,
      FormFieldMessageComponent,
      InputComponent,
      TextareaComponent,
      InputCounterComponent,
    ],
  });

  it('should create', () => {
    spectator = createHost('<kirby-form-field><input kirby-input/></kirby-form-field>');
    expect(spectator.component).toBeTruthy();
  });
});
