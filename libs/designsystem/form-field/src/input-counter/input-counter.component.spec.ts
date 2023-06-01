import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { FormFieldMessageComponent } from '../form-field-message/form-field-message.component';
import { InputComponent } from '../input/input.component';
import { TextareaComponent } from '../textarea/textarea.component';
import { InputCounterComponent } from './input-counter.component';

describe('InputCounterComponent', () => {
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
      spectator.setInput('length', 10);
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
      spectator.setInput('length', 10);
      spectator.setInput('maxlength', 0);
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
      spectator.setInput('length', 10);
      spectator.setInput('maxlength', 20);
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
      const input = new InputComponent(null);
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
      const input = new InputComponent(null);
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
      const textarea = new TextareaComponent();
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
      const textarea = new TextareaComponent();
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
