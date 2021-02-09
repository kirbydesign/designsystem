import { createHostFactory, SpectatorHost } from '@ngneat/spectator';

import { DesignTokenHelper, PlatformService } from '../../helpers';
import { TestHelper } from '../../testing/test-helper';
import { WindowRef } from '../../types';
import { ItemComponent } from '../item/item.component';

import { FormFieldMessageComponent } from './form-field-message/form-field-message.component';
import { FormFieldComponent } from './form-field.component';
import { InputCounterComponent } from './input-counter/input-counter.component';
import { InputComponent } from './input/input.component';
import { TextareaComponent } from './textarea/textarea.component';

const { size, fontSize, fontWeight, lineHeight, getElevation } = DesignTokenHelper;

describe('FormFieldComponent', () => {
  let spectator: SpectatorHost<FormFieldComponent>;

  const createHost = createHostFactory({
    component: FormFieldComponent,
    declarations: [
      FormFieldMessageComponent,
      InputComponent,
      TextareaComponent,
      InputCounterComponent,
      ItemComponent,
    ],
    mocks: [PlatformService],
    providers: [
      {
        provide: WindowRef,
        useValue: window,
      },
    ],
  });

  describe('by default', () => {
    beforeEach(() => {
      spectator = createHost(`<kirby-form-field> <input kirby-input /></kirby-form-field>`);
    });

    it('should create', () => {
      expect(spectator.component).toBeTruthy();
    });

    it('should have correct margin', () => {
      expect(spectator.element).toHaveComputedStyle({ 'margin-bottom': size('s') });
    });
    it('should have elevation', () => {
      const inputElement = spectator.queryHost('input[kirby-input]');
      expect(inputElement).toHaveComputedStyle({ 'box-shadow': getElevation(2) });
    });
  });

  describe('without label', () => {
    it('should not render the label', () => {
      spectator = createHost(`<kirby-form-field></kirby-form-field>`);
      const labelElement = spectator.queryHost('label');
      expect(labelElement).toBeNull();
    });
  });

  describe('When disabled', () => {
    it('should not have elevation', () => {
      spectator = createHost(`<kirby-form-field>
        <input kirby-input disabled value="Disabled input" />
      </kirby-form-field>`);
      const inputElement = spectator.queryHost('input[kirby-input]');
      expect(inputElement).toHaveComputedStyle({ 'box-shadow': 'none' });
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
      let dispatchEventSpy: jasmine.Spy<jasmine.Func>;

      beforeEach(() => {
        dispatchEventSpy = spyOn(document, 'dispatchEvent');

        spectator = createHost(
          `<kirby-form-field>
            <input kirby-input [readonly]="readonly" />
          </kirby-form-field>`,
          { detectChanges: false, hostProps: { readonly: false } } // Delay change detection to allow altering platform.isTouch()
        );

        spectator.detectChanges();
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

      it('should register shims', () => {
        spectator.setHostInput({ readonly: false });
        spectator.detectChanges(); //ngOnInit() + 1st ngAfterContentChecked()
        expect(dispatchEventSpy).toHaveBeenCalledTimes(1);
        expect(dispatchEventSpy).toHaveBeenCalledWith(
          new CustomEvent('ionInputDidLoad', {
            detail: spectator.element,
          })
        );
      });

      it('should NOT register shims if readonly', () => {
        spectator.setHostInput({ readonly: true });
        spectator.detectChanges(); //ngOnInit() + 1st ngAfterContentChecked()
        expect(dispatchEventSpy).toHaveBeenCalledTimes(0);
      });

      it('should register shims if changing from readonly to not readonly', () => {
        spectator.setHostInput({ readonly: true });
        spectator.detectChanges(); //ngOnInit() + 1st ngAfterContentChecked()
        expect(dispatchEventSpy).toHaveBeenCalledTimes(0);

        spectator.setHostInput({ readonly: false });
        spectator.detectChanges(); //ngOnInit() + 2nd ngAfterContentChecked()
        expect(dispatchEventSpy).toHaveBeenCalledTimes(1);
        expect(dispatchEventSpy).toHaveBeenCalledWith(
          new CustomEvent('ionInputDidLoad', {
            detail: spectator.element,
          })
        );
      });

      it('should dispatch `ionInputDidUnload` event on destroy', () => {
        spectator.fixture.destroy();
        const event: Event = dispatchEventSpy.calls.mostRecent().args[0];
        expect(event).toBeInstanceOf(CustomEvent);
        expect(event.type).toBe('ionInputDidUnload');
        expect((event as CustomEvent).detail).toEqual(spectator.element);
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

  describe('When nested inside a kirby-item', () => {
    describe('by default', () => {
      beforeEach(() => {
        spectator = createHost(
          `<kirby-item>
            <kirby-form-field>
              <input kirby-input />
            </kirby-form-field>
          </kirby-item>`
        );
      });

      it('should render with no bottom margin', () => {
        const formFieldElement = spectator.queryHost('kirby-form-field');
        expect(formFieldElement).toHaveComputedStyle({
          'margin-bottom': '0px',
        });
      });
    });

    describe('and slotted end', () => {
      beforeEach(() => {
        spectator = createHost(
          `<kirby-item>
            <kirby-form-field slot="end">
              <input kirby-input type="number"/>
            </kirby-form-field>
          </kirby-item>`
        );
      });

      it('should render the input with correct text alignment', () => {
        const formFieldElement = spectator.queryHost('input[kirby-input]');
        expect(formFieldElement).toHaveComputedStyle({
          'text-align': 'right',
        });
      });

      describe('when input is type number', () => {
        it('should render the input with correct font weight', () => {
          const formFieldElement = spectator.queryHost('input[kirby-input]');
          expect(formFieldElement).toHaveComputedStyle({
            'font-weight': fontWeight('bold'),
          });
        });
      });
    });
  });

  describe('focus', () => {
    let platformServiceSpy: jasmine.SpyObj<PlatformService>;

    beforeEach(() => {
      spectator = createHost(
        `<kirby-form-field>
        <input kirby-input />
      </kirby-form-field>`,
        { detectChanges: false } // Delay change detection to allow altering platform.isTouch()
      );
      platformServiceSpy = spectator.inject(PlatformService);
    });

    it('should focus input element if not touch', () => {
      platformServiceSpy.isTouch.and.returnValue(false);
      // Call detectChanges() twice - see: https://angular.io/guide/testing-components-scenarios#detectchanges
      spectator.detectChanges(); //ngOnInit() + 1st ngAfterContentChecked()
      spectator.detectChanges(); // 2nd ngAfterContentChecked
      const formFieldElement = spectator.queryHost<HTMLInputElement>('input[kirby-input]');
      const focusSpy = spyOn(formFieldElement, 'focus');

      spectator.component.focus();

      expect(focusSpy).toHaveBeenCalled();
    });

    it('should dispatch touch events if touch', () => {
      platformServiceSpy.isTouch.and.returnValue(true);
      // Call detectChanges() twice - see: https://angular.io/guide/testing-components-scenarios#detectchanges
      spectator.detectChanges(); //ngOnInit() + 1st ngAfterContentChecked()
      spectator.detectChanges(); // 2nd ngAfterContentChecked
      const inputElement = spectator.queryHost<HTMLInputElement>('input[kirby-input]');
      const dispatchEventSpy = spyOn(inputElement, 'dispatchEvent');

      spectator.component.focus();

      expect(dispatchEventSpy).toHaveBeenCalledTimes(2);
      const firstEvent: Event = dispatchEventSpy.calls.argsFor(0)[0];
      expect(firstEvent).toBeInstanceOf(TouchEvent);
      expect(firstEvent.type).toBe('touchstart');
      const secondEvent: Event = dispatchEventSpy.calls.argsFor(1)[0];
      expect(secondEvent).toBeInstanceOf(TouchEvent);
      expect(secondEvent.type).toBe('touchend');
    });
  });
});
