import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormFieldMessageComponent } from './form-field-message/form-field-message.component';
import { FormFieldComponent } from './form-field.component';
import { InputCounterComponent } from './input-counter/input-counter.component';
import { DecimalMaskDirective } from './directives/decimal-mask/decimal-mask.directive';
import { NumbersOnlyMaskDirective } from './directives/numbers-only-mask/numbers-only-mask.directive';

const declarations = [FormFieldComponent, FormFieldMessageComponent, InputCounterComponent];

@NgModule({
  imports: [CommonModule, DecimalMaskDirective, NumbersOnlyMaskDirective],
  declarations: [...declarations],
  exports: [...declarations, DecimalMaskDirective, NumbersOnlyMaskDirective],
})
export class FormFieldModule {}
