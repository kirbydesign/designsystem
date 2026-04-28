import { EventEmitter } from '@angular/core';

export abstract class FormFieldControl {
  abstract hasError: boolean;
  abstract hasErrorChange: EventEmitter<boolean>;

  /**
   * Returns the primary interactive element (input, textarea, button, etc.)
   * used to forward aria attributes from the form-field.
   */
  abstract getInteractiveElement(): HTMLElement | null;

  /**
   * Set to `true` if this control's content should be wrapped in a `<label>` element.
   * Defaults to `false`.
   */
  wrapInLabel: boolean = false;

  /**
   * Focuses the control. Override for controls that need custom focus logic
   * (e.g. radio-group). Defaults to focusing the interactive element.
   */
  focus(): void {
    this.getInteractiveElement()?.focus();
  }

  /**
   * Returns the raw `HTMLInputElement` if this control wraps a native `<input>`,
   * otherwise `null`. Used by the form-field to apply affix padding.
   */
  getInputElement(): HTMLInputElement | null {
    return null;
  }
}
