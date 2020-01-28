import { SpectatorHost, createHostFactory } from '@ngneat/spectator';

import { InputCounterComponent } from './input-counter/input-counter.component';
import { FormFieldComponent } from './form-field.component';
import { FormFieldMessageComponent } from './form-field-message/form-field-message.component';
import { InputComponent } from './input/input.component';
import { TextareaComponent } from './textarea/textarea.component';
import { DesignTokenHelper } from '../../helpers/design-token-helper';

const size = DesignTokenHelper.size;

describe('FormFieldComponent', () => {
  let spectator: SpectatorHost<FormFieldComponent>;
  let element: HTMLElement;

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

  beforeEach(() => {
    spectator = createHost(
      '<kirby-form-field><input kirby-input placeholder="Default input with placeholder text"/></kirby-form-field>'
    );
    element = spectator.element as HTMLElement;
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  describe('when containing an input element', () => {
    let inputElement: HTMLInputElement;

    beforeEach(() => {
      inputElement = element.getElementsByTagName('input')[0] as HTMLInputElement;
    });

    it('should render with correct height', () => {
      expect(inputElement).toHaveComputedStyle({ height: size('xxxl') });
    });

    it('should render with correct box-sizing', () => {
      expect(inputElement).toHaveComputedStyle({ 'box-sizing': 'border-box' });
    });

    it('should render with correct border-width', () => {
      expect(inputElement).toHaveComputedStyle({ 'border-width': '1px' });
    });
  });
});
