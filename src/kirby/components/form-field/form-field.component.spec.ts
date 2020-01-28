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
    spectator = createHost(
      '<kirby-form-field><input kirby-input placeholder="Default input with placeholder text"/></kirby-form-field>'
    );
    expect(spectator.component).toBeTruthy();
  });

  describe('and having a message', () => {
    describe('when having no counter', () => {
      it('should render the message with the correct flex', () => {
        spectator = createHost(
          `<kirby-form-field label="Input with label and message" message="This is additional info that will be shown below the input">
            <input kirby-input />
          </kirby-form-field>`
        );
        const messageElement = spectator.element.getElementsByTagName(
          'kirby-form-field-message'
        )[0];
        expect(messageElement).toHaveComputedStyle({ 'flex-basis': '100%' });
      });
    });

    describe('and having a counter', () => {
      it('should render the message with the correct flex', () => {
        spectator = createHost(
          `<kirby-form-field label="Input with label and message" message="This is additional info that will be shown below the input">
            <input kirby-input #message/>
            <kirby-input-counter [listenTo]="message"></kirby-input-counter>
          </kirby-form-field>`
        );
        const messageElement = spectator.element.getElementsByTagName(
          'kirby-form-field-message'
        )[0];
        expect(messageElement).toHaveComputedStyle({ 'flex-basis': '75%' });
      });
    });
  });
});
