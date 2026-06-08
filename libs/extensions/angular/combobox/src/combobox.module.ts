import { NgModule } from '@angular/core';

import { ListItemTemplateDirective, ListModule } from '@kirbydesign/designsystem/list';
import { ComboboxComponent } from './combobox.component';

@NgModule({
  imports: [ListModule, ComboboxComponent],
  exports: [ComboboxComponent, ListItemTemplateDirective],
})
export class ComboboxModule {}
