import { NgModule } from '@angular/core';

import { AutocompleteComponent } from './autocomplete.component';
import { ChipDirective } from './chip.directive';
import { OptionDirective } from './option.directive';

const directives = [AutocompleteComponent, OptionDirective, ChipDirective];

@NgModule({
  imports: [...directives],
  exports: [...directives],
})
export class AutocompleteModule {}
