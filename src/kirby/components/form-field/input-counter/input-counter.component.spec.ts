import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { MockComponent } from 'ng-mocks';

import { InputCounterComponent } from './input-counter.component';
import { FormFieldMessageComponent } from '../form-field-message/form-field-message.component';

fdescribe('InputCounterComponent', () => {
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
      expect(spectator.element.textContent).toEqual('');
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
      expect(spectator.element.textContent).toEqual(expectedText);
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
      expect(spectator.element.textContent).toEqual(expectedText);
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
      expect(spectator.element.textContent).toEqual(expectedText);
    });
  });
});
