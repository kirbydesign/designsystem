import { byText, createHostFactory, SpectatorHost } from '@ngneat/spectator';

import { DesignTokenHelper } from '@kirbydesign/designsystem/helpers';

import { PlatformService } from '@kirbydesign/designsystem/helpers';
import { WindowRef } from '@kirbydesign/designsystem/types';
import { TestHelper } from '@kirbydesign/designsystem/testing';
import { ItemComponent } from '@kirbydesign/designsystem/item';
import { RadioComponent, RadioGroupComponent } from '@kirbydesign/designsystem/radio';

import { fakeAsync, tick } from '@angular/core/testing';
import { FormFieldMessageComponent } from './form-field-message/form-field-message.component';
import { FormFieldComponent } from './form-field.component';
import { InputCounterComponent } from './input-counter/input-counter.component';
import { InputComponent } from './input/input.component';
import { TextareaComponent } from './textarea/textarea.component';
import { AffixDirective } from './directives/affix/affix.directive';

const { size, fontSize, fontWeight, lineHeight, getElevation } = DesignTokenHelper;

describe('FormFieldComponent', () => {
  let spectator: SpectatorHost<FormFieldComponent>;

  const createHost = createHostFactory({
    component: FormFieldComponent,
    declarations: [
      RadioGroupComponent,
      RadioComponent,
      InputCounterComponent,
      ItemComponent,
      FormFieldMessageComponent,
    ],
    imports: [TestHelper.ionicModuleForTest, AffixDirective, InputComponent, TextareaComponent],
    mocks: [PlatformService],
    providers: [
      {
        provide: WindowRef,
        useValue: <WindowRef>{ nativeWindow: window },
      },
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

  describe('when disabled', () => {
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
          <input kirby-input />
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

    describe('with message set to null', () => {
      it('should render the message wrapper with the correct padding', () => {
        spectator = createHost(
          `<kirby-form-field [message]="null">
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
    it('should render the input with elevation', () => {
      spectator = createHost(
        `<kirby-form-field>
          <input kirby-input />
        </kirby-form-field>`
      );
      const inputElement = spectator.queryHost('input[kirby-input]');
      expect(inputElement).toHaveComputedStyle({ 'box-shadow': getElevation(2) });
    });

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

      it('should render the input as a descendant', () => {
        const inputElement = spectator.queryHost('input[kirby-input]');
        expect(inputElement).toBeTruthy();
        expect(inputElement.closest('kirby-form-field')).toEqual(spectator.element);
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

      it('should render the textarea as a descendant', () => {
        const textareaElement = spectator.queryHost('textarea[kirby-textarea]');
        expect(textareaElement).toBeTruthy();
        expect(textareaElement.closest('kirby-form-field')).toEqual(spectator.element);
      });

      it('should not render the textarea within a label', () => {
        const textareaElement = spectator.queryHost('label textarea[kirby-textarea]');
        expect(textareaElement).toBeNull();
      });

      it('should render the textarea with elevation', () => {
        const textareaElement = spectator.queryHost('textarea[kirby-textarea]');
        expect(textareaElement).toHaveComputedStyle({ 'box-shadow': getElevation(2) });
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

  describe('with slotted radio-group', () => {
    let radioGroupElement: HTMLElement;
    let label: HTMLLabelElement;
    describe('and no label', () => {
      beforeEach(() => {
        spectator = createHost(
          `<kirby-form-field>
             <kirby-radio-group
               [items]="['Test 1','Test 2','Test 3']">
             </kirby-radio-group>
           <kirby-form-field>`
        );
        radioGroupElement = spectator.queryHost('kirby-radio-group');
        label = spectator.queryHost('label');
      });

      it('should render the radio-group as a descendant', () => {
        expect(radioGroupElement).toBeTruthy();
        expect(radioGroupElement.closest('kirby-form-field')).toEqual(spectator.element);
      });

      it('should not render the radio-group within a label', () => {
        const radioGroupInLabel = spectator.queryHost('label kirby-radio-group');
        expect(radioGroupInLabel).toBeNull();
      });

      it('should not render a label', () => {
        expect(label).toBeNull();
      });
    });

    describe('and a label', () => {
      beforeEach(() => {
        spectator = createHost(
          `<kirby-form-field label="Radio group with label">
            <kirby-radio-group
              [items]="['Test 1','Test 2','Test 3']">
            </kirby-radio-group>
          <kirby-form-field>`
        );
        radioGroupElement = spectator.queryHost('kirby-radio-group');
        label = spectator.queryHost('label');
      });

      it('should render the radio-group', () => {
        expect(radioGroupElement).toBeTruthy();
      });

      it('should not render the radio-group within a label', () => {
        const radioGroupInLabel = spectator.queryHost('label kirby-radio-group');
        expect(radioGroupInLabel).toBeNull();
      });

      it('should render a label', () => {
        expect(label).toBeTruthy();
      });

      it('should associate the label with the radio group', () => {
        expect(radioGroupElement.getAttribute('aria-labelledby')).toEqual(label.id);
      });

      it('should focus the the radio group when clicking the label ', () => {
        const radioGroupComponent = spectator.query(RadioGroupComponent);
        const focusSpy = spyOn(radioGroupComponent, 'focus');

        spectator.click(label);

        expect(focusSpy).toHaveBeenCalled();
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

    it('should focus input element if not touch', fakeAsync(() => {
      platformServiceSpy.isTouch.and.returnValue(false);
      // Call detectChanges() twice - see: https://angular.io/guide/testing-components-scenarios#detectchanges
      spectator.detectChanges(); //ngOnInit() + 1st ngAfterContentChecked()
      spectator.detectChanges(); // 2nd ngAfterContentChecked
      const formFieldElement = spectator.queryHost<HTMLInputElement>('input[kirby-input]');
      const focusSpy = spyOn(formFieldElement, 'focus');

      spectator.component.focus();
      tick();

      expect(focusSpy).toHaveBeenCalled();
    }));

    it('should dispatch touch events if touch', fakeAsync(() => {
      platformServiceSpy.isTouch.and.returnValue(true);
      // Call detectChanges() twice - see: https://angular.io/guide/testing-components-scenarios#detectchanges
      spectator.detectChanges(); //ngOnInit() + 1st ngAfterContentChecked()
      spectator.detectChanges(); // 2nd ngAfterContentChecked
      const inputElement = spectator.queryHost<HTMLInputElement>('input[kirby-input]');
      const dispatchEventSpy = spyOn(inputElement, 'dispatchEvent');

      spectator.component.focus();
      tick();

      expect(dispatchEventSpy).toHaveBeenCalledTimes(2);
      const firstEvent: Event = dispatchEventSpy.calls.argsFor(0)[0];
      expect(firstEvent).toBeInstanceOf(TouchEvent);
      expect(firstEvent.type).toBe('touchstart');
      const secondEvent: Event = dispatchEventSpy.calls.argsFor(1)[0];
      expect(secondEvent).toBeInstanceOf(TouchEvent);
      expect(secondEvent.type).toBe('touchend');
    }));
  });

  describe('affix', () => {
    describe('with prefix', () => {
      beforeEach(() => {
        spectator = createHost(
          `<kirby-form-field>
            <span kirby-affix="prefix" style="width: 50px">foo</span>
            <input kirby-input />
           </kirby-form-field>`
        );
      });

      it('should render prefix content', () => {
        const affix = spectator.query(byText('foo'));

        expect(affix).toBeTruthy();
      });

      it('should render prefix content in correct slot', () => {
        const affix = spectator.query(byText('foo'));

        expect(affix.parentElement.classList).toContain('prefix');
      });
    });

    describe('with suffix', () => {
      beforeEach(() => {
        spectator = createHost(
          `<kirby-form-field>
            <span kirby-affix="suffix" style="width: 50px">foo</span>
            <input kirby-input />
           </kirby-form-field>`
        );
      });

      it('should render suffix content', () => {
        const affix = spectator.query(byText('foo'));

        expect(affix).toBeTruthy();
      });

      it('should render suffix content in correct slot', () => {
        const affix = spectator.query(byText('foo'));

        expect(affix.parentElement.classList).toContain('suffix');
      });
    });

    describe('with suffix and prefix', () => {
      beforeEach(() => {
        spectator = createHost(
          `<kirby-form-field>
            <span kirby-affix="suffix">foo</span>
            <span kirby-affix="prefix">bar</span>
            <input kirby-input />
           </kirby-form-field>`
        );
      });

      it('should render both prefix and suffix content', () => {
        const suffix = spectator.query(byText('foo'));
        const prefix = spectator.query(byText('bar'));

        expect(suffix).toBeTruthy();
        expect(prefix).toBeTruthy();
      });
    });
  });
});
