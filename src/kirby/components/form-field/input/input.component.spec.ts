import { Spectator, createTestComponentFactory } from '@netbasal/spectator';

import { InputComponent } from './input.component';

describe('InputComponent', () => {
  let spectator: Spectator<InputComponent>;
  let component: InputComponent;

  const createComponent = createTestComponentFactory({
    component: InputComponent,
    declarations: [InputComponent],
  });

  beforeEach(() => {
    spectator = createComponent({});
    spectator.detectChanges();
    component = spectator.component;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('inputs', () => {
    it('should default autocomplete to being off', () => {
      expect(component.autocomplete).toEqual('off');
    });

    it('should default autocorrect to being off', () => {
      expect(component.autocorrect).toEqual('off');
    });

    it('should default to not being disabled', () => {
      expect(component.disabled).toBe(false);
    });

    it('should default name to input id', () => {
      expect(component.name).toMatch(new RegExp('kirby-input-(\\d)'));
    });

    it('should default to be of type text', () => {
      expect(component.type).toEqual('text');
    });
  });

  describe('accessibility', () => {
    it('should auto generate an input id', () => {
      expect(component.inputId).toMatch(new RegExp('kirby-input-(\\d)'));
    });

    it('should auto generate a label id', () => {
      expect(component.labelId).toMatch(new RegExp('kirby-input-(\\d)-label'));
    });

    it('should set the id attribute of the label', () => {
      const labelForAttributeValue = spectator.query('label').id;
      expect(labelForAttributeValue).toEqual(component.labelId);
    });

    it('should set the id attribute of the input', () => {
      const labelForAttributeValue = spectator.query('input').id;
      expect(labelForAttributeValue).toEqual(component.inputId);
    });

    it('should set the aria labelledby attribute of the input', () => {
      const inputAriaLabelledbyAttributeValue = spectator
        .query('input')
        .attributes.getNamedItem('aria-labelledby').value;
      expect(inputAriaLabelledbyAttributeValue).toEqual(component.labelId);
    });

    it('should use the correct value in the ´for´ attribute of the label', () => {
      spectator.setInput({
        name: 'custom name',
      });
      const labelForAttributeValue = spectator.query('label').attributes.getNamedItem('for').value;

      expect(labelForAttributeValue).toEqual(component.name);
    });
  });

  describe('event', () => {
    it('should trigger blur event, when input loses focus', () => {
      const blurEventSpy = spyOn(component.blur, 'emit');

      spectator.query('input').dispatchEvent(new Event('blur'));

      expect(blurEventSpy).toHaveBeenCalled();
    });

    it('should trigger focus event, when input gets focus', () => {
      const blurEventSpy = spyOn(component.focus, 'emit');

      spectator.query('input').dispatchEvent(new Event('focus'));

      expect(blurEventSpy).toHaveBeenCalled();
    });
  });
});
