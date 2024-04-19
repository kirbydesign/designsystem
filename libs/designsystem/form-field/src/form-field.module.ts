import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IconModule } from '@kirbydesign/designsystem/icon';
import { FormFieldMessageComponent } from './form-field-message/form-field-message.component';
import { FormFieldComponent } from './form-field.component';
import { InputCounterComponent } from './input-counter/input-counter.component';
import { DecimalMaskDirective } from './directives/decimal-mask/decimal-mask.directive';

const declarations = [FormFieldComponent, FormFieldMessageComponent, InputCounterComponent];

@NgModule({
  imports: [CommonModule, DecimalMaskDirective, IconModule],
  declarations: [...declarations],
  exports: [...declarations, DecimalMaskDirective],
})
export class FormFieldModule {}
