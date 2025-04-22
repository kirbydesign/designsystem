import {
  createComponentFactory,
  createHostFactory,
  Spectator,
  SpectatorHost,
} from '@ngneat/spectator';

import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormFieldMessageComponent } from '../form-field-message/form-field-message.component';
import { InputComponent } from '../input/input.component';
import { TextareaComponent } from '../textarea/textarea.component';
import { InputCounterComponent } from './input-counter.component';

describe('InputCounterComponent', () => {
  describe('when used outside a form', () => {
    let component: InputCounterComponent;
    let spectator: Spectator<InputCounterComponent>;
    const createHost = createComponentFactory({
      component: InputCounterComponent,
      declarations: [FormFieldMessageComponent],
    });

    beforeEach(() => {
      spectator = createHost();
      component = spectator.component;
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    describe('when configured with no length', () => {
      it('should not have any text', () => {
        expect(component.text).toBeUndefined();
      });

      it('should render counter correctly', () => {
        expect(spectator.element.textContent.trim()).toEqual('');
      });
    });

    describe('when configured with length and no maxlength', () => {
      const expectedText = '10';
      beforeEach(() => {
        spectator.component.length = 10;
        spectator.detectChanges();
      });

      it('should have correct text', () => {
        expect(component.text).toEqual(expectedText);
      });

      it('should render text correctly', () => {
        expect(spectator.element.textContent.trim()).toEqual(expectedText);
      });
    });

    describe('when configured with length and maxlength = 0', () => {
      const expectedText = '10';
      beforeEach(() => {
        spectator.component.length = 10;
        spectator.component.maxlength = 0;
        spectator.detectChanges();
      });

      it('should have correct text', () => {
        expect(component.text).toEqual(expectedText);
      });

      it('should render text correctly', () => {
        expect(spectator.element.textContent.trim()).toEqual(expectedText);
      });
    });

    describe('when configured with length and maxlength', () => {
      const expectedText = '10/20';
      beforeEach(() => {
        spectator.component.length = 10;
        spectator.component.maxlength = 20;
        spectator.detectChanges();
      });

      it('should have correct text', () => {
        expect(component.text).toEqual(expectedText);
      });

      it('should render text correctly', () => {
        expect(spectator.element.textContent.trim()).toEqual(expectedText);
      });
    });

    describe('when configured with listenTo = input', () => {
      describe('and input does not have initial value and maxlength', () => {
        const input = new InputComponent(null, null);
        beforeEach(() => {
          component.listenTo = input;
          component.ngOnInit();
        });

        it('should have initial length = 0', () => {
          expect(component.length).toEqual(0);
        });

        it('should not have maxlength', () => {
          expect(component.maxlength).toBeUndefined();
        });

        it('should get updated length from kirbyChange event', () => {
          const testValue = 'Test 123';
          input.kirbyChange.emit(testValue);
          expect(component.length).toEqual(testValue.length);
        });
      });

      describe('and input has initial value and maxlength', () => {
        const initialValue = 'Test 123';
        const updatedValue = 'Test 123456';
        const maxlength = 99;
        const input = new InputComponent(null, null);
        input.value = initialValue;
        input.maxlength = maxlength;
        beforeEach(() => {
          component.listenTo = input;
          component.ngOnInit();
        });

        it('should get initial length from input value', () => {
          expect(component.length).toEqual(initialValue.length);
        });

        it('should get maxlength from input', () => {
          expect(component.maxlength).toEqual(maxlength);
        });

        it('should get updated length from kirbyChange event', () => {
          expect(component.length).toEqual(initialValue.length);
          input.kirbyChange.emit(updatedValue);
          expect(component.length).toEqual(updatedValue.length);
        });
      });
    });

    describe('when configured with listenTo = textarea', () => {
      describe('and textarea does not have initial value and maxlength', () => {
        const textarea = new TextareaComponent(null);
        beforeEach(() => {
          component.listenTo = textarea;
          component.ngOnInit();
        });

        it('should have initial length = 0', () => {
          expect(component.length).toEqual(0);
        });

        it('should not have maxlength', () => {
          expect(component.maxlength).toBeUndefined();
        });

        it('should get updated length from kirbyChange event', () => {
          const testValue = 'Test 123';
          textarea.kirbyChange.emit(testValue);
          expect(component.length).toEqual(testValue.length);
        });
      });

      describe('and textarea has initial value and maxlength', () => {
        const initialValue = 'Test 123';
        const updatedValue = 'Test 123456';
        const maxlength = 99;
        const textarea = new TextareaComponent(null);
        textarea.value = initialValue;
        textarea.maxlength = maxlength;
        beforeEach(() => {
          component.listenTo = textarea;
          component.ngOnInit();
        });

        it('should get initial length from textarea value', () => {
          expect(component.length).toEqual(initialValue.length);
        });

        it('should get maxlength from textarea', () => {
          expect(component.maxlength).toEqual(maxlength);
        });

        it('should get updated length from kirbyChange event', () => {
          expect(component.length).toEqual(initialValue.length);
          textarea.kirbyChange.emit(updatedValue);
          expect(component.length).toEqual(updatedValue.length);
        });
      });
    });
  });

  describe('when used in a form with a form control bound to textarea', () => {
    let component: InputCounterComponent;
    let spectator: SpectatorHost<InputCounterComponent>;
    let formGroup = new FormGroup({
      textarea: new FormControl(''),
    });

    const createHost = createHostFactory({
      component: InputCounterComponent,
      declarations: [FormFieldMessageComponent],
      imports: [TextareaComponent, ReactiveFormsModule],
    });

    beforeEach(() => {
      formGroup = new FormGroup({
        textarea: new FormControl(''),
      });

      spectator = createHost(
        `<form [formGroup]="formGroup">
          <textarea #textarea [formControl]="formGroup.controls.textarea" kirby-textarea></textarea>
          <kirby-input-counter #inputCounter [listenTo]="textarea"></kirby-input-counter>
        </form>`,
        {
          hostProps: { formGroup },
          detectChanges: true,
        }
      );
      component = spectator.component;

      component.ngOnInit();
    });

    it('should update counter on formControl change', () => {
      const initialValue = 'Initial value';
      const updatedValue = 'Updated';
      const inputCounterComponent = spectator.queryHost(InputCounterComponent);

      formGroup.controls.textarea.setValue(initialValue);
      expect(inputCounterComponent.text).toBe(initialValue.length.toString());

      formGroup.controls.textarea.setValue(updatedValue);
      expect(inputCounterComponent.text).toBe(updatedValue.length.toString());

      formGroup.reset({
        textarea: '',
      });
      expect(inputCounterComponent.text).toBe('0');
    });
  });

  describe('when used in a form with a form control bound to input', () => {
    let component: InputCounterComponent;
    let spectator: SpectatorHost<InputCounterComponent>;
    let formGroup = new FormGroup({
      input: new FormControl(''),
    });

    const createHost = createHostFactory({
      component: InputCounterComponent,
      declarations: [FormFieldMessageComponent],
      imports: [InputComponent, ReactiveFormsModule],
    });

    beforeEach(() => {
      formGroup = new FormGroup({
        input: new FormControl(''),
      });

      spectator = createHost(
        `<form [formGroup]="formGroup">
          <input #input [formControl]="formGroup.controls.input" kirby-input />
          <kirby-input-counter #inputCounter [listenTo]="input"></kirby-input-counter>
        </form>`,
        {
          hostProps: { formGroup },
          detectChanges: true,
        }
      );
      component = spectator.component;

      component.ngOnInit();
    });

    it('should update counter on formControl change', () => {
      const initialValue = 'Initial value';
      const updatedValue = 'Updated';
      const inputCounterComponent = spectator.queryHost(InputCounterComponent);

      formGroup.controls.input.setValue(initialValue);
      expect(inputCounterComponent.text).toBe(initialValue.length.toString());

      formGroup.controls.input.setValue(updatedValue);
      expect(inputCounterComponent.text).toBe(updatedValue.length.toString());

      formGroup.reset({
        input: '',
      });
      expect(inputCounterComponent.text).toBe('0');
    });
  });
});
