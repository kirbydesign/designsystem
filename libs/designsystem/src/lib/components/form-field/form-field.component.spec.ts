import { SpectatorHost, createHostFactory } from '@ngneat/spectator';

import { DesignTokenHelper } from '../../helpers/design-token-helper';
import { TestHelper } from '../../testing/test-helper';
import { InputCounterComponent } from './input-counter/input-counter.component';
import { FormFieldComponent } from './form-field.component';
import { FormFieldMessageComponent } from './form-field-message/form-field-message.component';
import { InputComponent } from './input/input.component';
import { TextareaComponent } from './textarea/textarea.component';

const size = DesignTokenHelper.size;
const fontSize = DesignTokenHelper.fontSize;
const fontWeight = DesignTokenHelper.fontWeight;
const lineHeight = DesignTokenHelper.lineHeight;

describe('FormFieldComponent', () => {
  let spectator: SpectatorHost<FormFieldComponent>;

  const createHost = createHostFactory({
    component: FormFieldComponent,
    declarations: [
      FormFieldMessageComponent,
      InputComponent,
      TextareaComponent,
      InputCounterComponent,
    ],
  });

  describe('by default', () => {
    beforeEach(() => {
      spectator = createHost(`<kirby-form-field></kirby-form-field>`);
    });

    it('should create', () => {
      expect(spectator.component).toBeTruthy();
    });

    it('should have correct margin', () => {
      expect(spectator.element).toHaveComputedStyle({ 'margin-bottom': size('s') });
    });
  });

  describe('without label', () => {
    it('should not render the label', () => {
      spectator = createHost(`<kirby-form-field></kirby-form-field>`);
      const labelElement = spectator.queryHost('label');
      expect(labelElement).toBeNull();
    });
  });

  describe('with label', () => {
    let labelElement: HTMLLabelElement;
    let labelTextElement: HTMLElement;
    beforeEach(() => {
      spectator = createHost(
        `<kirby-form-field label="Form field with label">
         </kirby-form-field>`
      );
      labelElement = spectator.queryHost('label');
      labelTextElement = spectator.queryHost('label .text');
    });

    it('should render the label', () => {
      expect(labelElement).toBeTruthy();
    });

    it('should render the label with correct typography', () => {
      expect(labelTextElement).toHaveComputedStyle({
        'font-size': fontSize('s'),
        'font-weight': fontWeight('light'),
        'line-height': lineHeight('s'),
      });
    });

    it('should render the label with correct padding', () => {
      expect(labelTextElement).toHaveComputedStyle({
        'padding-top': '0px',
        'padding-left': size('s'),
        'padding-right': size('s'),
        'padding-bottom': '0px',
      });
    });

    it('should render the label with correct margin', () => {
      expect(labelTextElement).toHaveComputedStyle({
        'margin-bottom': size('xxxs'),
      });
    });
  });

  describe('without message or counter', () => {
    it('should not render the message wrapper', () => {
      spectator = createHost(`<kirby-form-field></kirby-form-field>`);
      const messageWrapperElement = spectator.queryHost('.texts');
      expect(messageWrapperElement).toBeNull();
    });
  });

  describe('with message', () => {
    it('should render the message wrapper with the correct padding', () => {
      spectator = createHost(
        `<kirby-form-field message="This is additional info that will be shown below the input">
           <input kirby-input />
         </kirby-form-field>`
      );
      const messageWrapperElement = spectator.queryHost('.texts');
      expect(messageWrapperElement).toHaveComputedStyle({
        'padding-top': '2px',
        'padding-left': size('s'),
        'padding-right': size('s'),
        'padding-bottom': '0px',
      });
    });

    const getAvailableTextWidth = () => {
      const componentWidth = spectator.element.getBoundingClientRect().width;
      const textWrapperElement = spectator.queryHost('.texts');
      const paddingLeft = parseInt(TestHelper.getCssProperty(textWrapperElement, 'padding-left'));
      const paddingRight = parseInt(TestHelper.getCssProperty(textWrapperElement, 'padding-right'));
      const availableTextWidth = componentWidth - paddingLeft - paddingRight;
      return availableTextWidth;
    };

    describe('when having no counter', () => {
      let messageElement: HTMLElement;
      beforeEach(() => {
        spectator = createHost(
          `<kirby-form-field message="This is additional info that will be shown below the input">
             <input kirby-input />
           </kirby-form-field>`
        );
        messageElement = spectator.queryHost('kirby-form-field-message');
      });

      it('should render the message full width', () => {
        const messageWidth = messageElement.getBoundingClientRect().width;
        const availableTextWidth = getAvailableTextWidth();
        expect(messageWidth).toEqual(availableTextWidth);
      });
    });

    describe('when having a counter', () => {
      let messageElement: HTMLElement;
      let counterWrapperElement: HTMLElement;
      beforeEach(() => {
        spectator = createHost(
          `<kirby-form-field message="This is additional info that will be shown below the input">
             <input kirby-input #message/>
             <kirby-input-counter [listenTo]="message"></kirby-input-counter>
           </kirby-form-field>`
        );
        messageElement = spectator.queryHost('kirby-form-field-message');
        counterWrapperElement = spectator.queryHost('.counter');
      });

      it('should render the message with correct width', () => {
        const availableTextWidth = getAvailableTextWidth();
        const expectedMessageWidth = availableTextWidth * 0.75;
        const messageWidth = messageElement.getBoundingClientRect().width;
        expect(messageWidth).toEqual(expectedMessageWidth);
      });

      it('should render the counter with correct width', () => {
        const availableTextWidth = getAvailableTextWidth();
        const expectedCounterWidth = availableTextWidth * 0.25;
        const counterWidth = counterWrapperElement.getBoundingClientRect().width;
        expect(counterWidth).toEqual(expectedCounterWidth);
      });
    });
  });

  describe('with slotted input', () => {
    describe('and no label', () => {
      beforeEach(() => {
        spectator = createHost(
          `<kirby-form-field>
             <input kirby-input/>
           </kirby-form-field>`
        );
      });

      it('should render the input', () => {
        const inputElement = spectator.queryHost('input[kirby-input]');
        expect(inputElement).toBeTruthy();
      });

      it('should render the input as a direct descendant', () => {
        const inputElement = spectator.queryHost('input[kirby-input]');
        expect(inputElement).toBeTruthy();
        expect(inputElement.parentElement).toEqual(spectator.element);
      });

      it('should not render the input within a label', () => {
        const inputElement = spectator.queryHost('label input[kirby-input]');
        expect(inputElement).toBeNull();
      });
    });

    describe('and a label', () => {
      beforeEach(() => {
        spectator = createHost(
          `<kirby-form-field label="Input with label">
             <input kirby-input/>
           </kirby-form-field>`
        );
      });

      it('should render the input', () => {
        const inputElement = spectator.queryHost('input[kirby-input]');
        expect(inputElement).toBeTruthy();
      });

      it('should render the input within a label', () => {
        const inputElement = spectator.queryHost('label input[kirby-input]');
        expect(inputElement).toBeTruthy();
      });
    });
  });

  describe('with slotted textarea', () => {
    describe('and no label', () => {
      beforeEach(() => {
        spectator = createHost(
          `<kirby-form-field>
             <textarea kirby-textarea></textarea>
           <kirby-form-field>`
        );
      });

      it('should render the textarea', () => {
        const textareaElement = spectator.queryHost('textarea[kirby-textarea]');
        expect(textareaElement).toBeTruthy();
      });

      it('should render the textarea as a direct descendant', () => {
        const textareaElement = spectator.queryHost('textarea[kirby-textarea]');
        expect(textareaElement).toBeTruthy();
        expect(textareaElement.parentElement).toEqual(spectator.element);
      });

      it('should not render the textarea within a label', () => {
        const textareaElement = spectator.queryHost('label textarea[kirby-textarea]');
        expect(textareaElement).toBeNull();
      });
    });

    describe('and a label', () => {
      beforeEach(() => {
        spectator = createHost(
          `<kirby-form-field label="Textarea with label">
             <textarea kirby-textarea></textarea>
           </kirby-form-field>`
        );
      });

      it('should render the textarea', () => {
        const textareaElement = spectator.queryHost('textarea[kirby-textarea]');
        expect(textareaElement).toBeTruthy();
      });

      it('should render the textarea within a label', () => {
        const textareaElement = spectator.queryHost('label textarea[kirby-textarea]');
        expect(textareaElement).toBeTruthy();
      });
    });
  });
});
