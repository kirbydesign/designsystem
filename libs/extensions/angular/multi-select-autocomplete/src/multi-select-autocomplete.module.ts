import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ButtonComponent } from '@kirbydesign/designsystem/button';
import { CardModule } from '@kirbydesign/designsystem/card';
import { IconModule } from '@kirbydesign/designsystem/icon';
import { ItemModule } from '@kirbydesign/designsystem/item';
import { PopoverComponent } from '@kirbydesign/designsystem/popover';

import { ListItemTemplateDirective, ListModule } from '@kirbydesign/designsystem/list';
import { FormFieldModule, InputComponent } from '@kirbydesign/designsystem/form-field';
import { MultiSelectAutocompleteComponent } from './multi-select-autocomplete.component';

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
    MultiSelectAutocompleteComponent,
  ],
  exports: [MultiSelectAutocompleteComponent, ListItemTemplateDirective],
  providers: [],
})
export class MultiSelectAutocompleteModule {}
