import { createHostFactory, SpectatorHost } from '@ngneat/spectator';

import { InputComponent } from './input.component';

describe('InputComponent', () => {
  let spectator: SpectatorHost<InputComponent>;
  const createHost = createHostFactory(InputComponent);

  let value = 'abc';

  beforeEach(() => (spectator = createHost('<input type="text" kirby-input>')));

  it('should create', () => {
    expect(spectator).toBeTruthy();
  });

  describe('maxlength', () => {
    it('should not cut off characters when maxlength is not specified', () => {
      spectator.typeInElement(value, spectator.element);

      value += 'd';
      spectator.debugElement.triggerEventHandler('keyup', { target: { value } });

      expect(spectator.debugElement.nativeElement.value).toEqual(value);
    });

    it('should not cut off characters when value length is less than maxlength', () => {
      spectator.typeInElement(value, spectator.element);
      spectator.component.maxlength = 30;

      value += 'd';
      spectator.debugElement.triggerEventHandler('keyup', { target: { value } });

      expect(spectator.debugElement.nativeElement.value).toEqual(value);
    });

    it('should cut off characters when value length is greater than maxlength', () => {
      spectator.typeInElement(value, spectator.element);
      spectator.component.maxlength = 2;

      value += 'd';
      spectator.debugElement.triggerEventHandler('keyup', { target: { value } });

      expect(spectator.debugElement.nativeElement.value).toEqual('ab');
    });
  });
});
