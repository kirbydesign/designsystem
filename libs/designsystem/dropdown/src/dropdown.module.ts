import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ButtonComponent } from '@kirbydesign/designsystem/button';
import { CardModule } from '@kirbydesign/designsystem/card';
import { FormFieldModule } from '@kirbydesign/designsystem/form-field';
import { IconModule } from '@kirbydesign/designsystem/icon';
import { ItemModule } from '@kirbydesign/designsystem/item';
import { PopoverComponent } from '@kirbydesign/designsystem/popover';

import { ListItemTemplateDirective } from '@kirbydesign/designsystem/list';
import { DropdownComponent } from './dropdown.component';
import { KeyboardHandlerService } from './keyboard-handler.service';

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
    ListItemTemplateDirective,
  ],
  declarations: [...declarations],
  exports: [...declarations, ListItemTemplateDirective],
  providers: [KeyboardHandlerService],
})
export class DropdownModule {}
