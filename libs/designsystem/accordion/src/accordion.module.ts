import { NgModule } from '@angular/core';
import { IconModule } from '@kirbydesign/designsystem/icon';

import { AccordionItemComponent } from './accordion-item.component';
import { AccordionDirective } from './accordion.directive';

const imports = [AccordionDirective, AccordionItemComponent];

@NgModule({
  imports: [IconModule, ...imports],
  exports: [...imports],
})
export class AccordionModule {}
