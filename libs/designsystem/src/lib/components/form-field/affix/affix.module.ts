import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { InputAffixComponent } from './input-affix.component';
import { InputAffixDirective } from './input-affix.directive';

@NgModule({
  imports: [CommonModule],
  exports: [InputAffixComponent, InputAffixDirective],
  declarations: [InputAffixDirective, InputAffixComponent],
})
export class AffixModule {}
