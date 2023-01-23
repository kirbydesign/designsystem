import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CardModule } from '@kirbydesign/designsystem/card';
import { IconModule } from '@kirbydesign/designsystem/icon';
import { ButtonComponent } from '../button/button.component';
import { FormFieldModule } from '../form-field/form-field.module';
import { ItemModule } from '../item';
import { PopoverComponent } from '../popover/popover.component';
import { DropdownComponent } from './dropdown.component';
import { KeyboardHandlerService } from './keyboard-handler.service';
import { FloatingDirective } from './../../directives/floating/floating.directive';

const declarations = [DropdownComponent];

@NgModule({
  imports: [
    CardModule,
    IconModule,
    ItemModule,
    FormFieldModule,
    PopoverComponent,
    ButtonComponent,
    CommonModule,
    FloatingDirective,
  ],
  declarations: [...declarations],
  exports: [...declarations],
  providers: [KeyboardHandlerService],
})
export class DropdownModule {}
