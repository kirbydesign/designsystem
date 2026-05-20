import { EventEmitter, InjectionToken } from '@angular/core';

export interface FormFieldControl {
  hasError: boolean;
  hasErrorChange: EventEmitter<boolean>;
  /** The focusable/interactive element within the control, used for accessibility attributes and focus management. */
  interactiveElement: HTMLElement;
}

export const FORM_FIELD_CONTROL = new InjectionToken<FormFieldControl>('FormFieldControl');
