import { SpectatorDirective } from '@ngneat/spectator';

export class KeyboardHelper {
  public static Press<T>(
    directive: SpectatorDirective<T>,
    input: HTMLInputElement,
    value: string
  ): void {
    directive.dispatchKeyboardEvent(input, 'keydown', value, input);
    input.focus();
    input.value += value;
    directive.dispatchKeyboardEvent(input, 'keyup', value, input);
  }
}
