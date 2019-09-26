import { Spectator, createTestComponentFactory } from '@netbasal/spectator';

import { TextareaComponent } from './textarea.component';

describe('TextareaComponent', () => {
  let spectator: Spectator<TextareaComponent>;
  let component: TextareaComponent;

  const createComponent = createTestComponentFactory({
    component: TextareaComponent,
    declarations: [TextareaComponent],
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
    it('should default to not being disabled', () => {
      expect(component.disabled).toBe(false);
    });

    it('should default name to input id', () => {
      expect(component.name).toMatch(new RegExp('kirby-textarea-(\\d)'));
    });
  });

  describe('accessibility', () => {
    it('should auto generate an textarea id', () => {
      expect(component.textareaId).toMatch(new RegExp('kirby-textarea-(\\d)'));
    });

    it('should auto generate a label id', () => {
      expect(component.labelId).toMatch(new RegExp('kirby-textarea-(\\d)-label'));
    });

    it('should set the id attribute of the label', () => {
      const labelForAttributeValue = spectator.query('label').id;
      expect(labelForAttributeValue).toEqual(component.labelId);
    });

    it('should set the id attribute of the textarea', () => {
      const labelForAttributeValue = spectator.query('textarea').id;
      expect(labelForAttributeValue).toEqual(component.textareaId);
    });

    it('should set the aria labelledby attribute of the input', () => {
      const inputAriaLabelledbyAttributeValue = spectator
        .query('textarea')
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

      spectator.query('textarea').dispatchEvent(new Event('blur'));

      expect(blurEventSpy).toHaveBeenCalled();
    });

    it('should trigger focus event, when input gets focus', () => {
      const blurEventSpy = spyOn(component.focus, 'emit');

      spectator.query('textarea').dispatchEvent(new Event('focus'));

      expect(blurEventSpy).toHaveBeenCalled();
    });
  });
});
