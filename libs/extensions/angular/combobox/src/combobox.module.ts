import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ButtonComponent } from '@kirbydesign/designsystem/button';
import { CardModule } from '@kirbydesign/designsystem/card';
import { IconModule } from '@kirbydesign/designsystem/icon';
import { ItemModule } from '@kirbydesign/designsystem/item';
import { PopoverComponent } from '@kirbydesign/designsystem/popover';

import { ListItemTemplateDirective, ListModule } from '@kirbydesign/designsystem/list';
import { FormFieldModule, InputComponent } from '@kirbydesign/designsystem/form-field';
import { ComboboxComponent } from './combobox.component';

@NgModule({
  imports: [
    CardModule,
    IconModule,
    ItemModule,
    PopoverComponent,
    ButtonComponent,
    CommonModule,
    ListModule,
    FormFieldModule,
    InputComponent,
    ComboboxComponent,
  ],
  exports: [ComboboxComponent, ListItemTemplateDirective],
  providers: [],
})
export class ComboboxModule {}
