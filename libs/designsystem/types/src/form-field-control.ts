import { EventEmitter } from '@angular/core';

export interface FormFieldControl {
  hasError: boolean;
  hasErrorChange: EventEmitter<boolean>;
}
