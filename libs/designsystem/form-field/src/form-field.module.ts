import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormFieldMessageComponent } from './form-field-message/form-field-message.component';
import { FormFieldComponent } from './form-field.component';
import { InputCounterComponent } from './input-counter/input-counter.component';

const declarations = [FormFieldComponent, FormFieldMessageComponent, InputCounterComponent];

@NgModule({
  imports: [CommonModule],
  declarations: [...declarations],
  exports: [...declarations],
})
export class FormFieldModule {}
