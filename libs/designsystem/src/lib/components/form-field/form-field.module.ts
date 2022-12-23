import { NgModule } from '@angular/core';
import { FormFieldMessageComponent } from './form-field-message/form-field-message.component';
import { FormFieldComponent } from './form-field.component';

const declarations = [FormFieldComponent, FormFieldMessageComponent];

@NgModule({
  imports: [],
  declarations: [...declarations],
  exports: [...declarations],
})
export class FormFieldModule {}
