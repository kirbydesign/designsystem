import { NgModule } from '@angular/core';
import { IconModule } from '@kirbydesign/designsystem/icon';

import { AccordionItemComponent } from './accordion-item.component';
import { AccordionDirective } from './accordion.directive';

const declarations = [AccordionDirective, AccordionItemComponent];

@NgModule({
  imports: [IconModule, ...declarations],
  exports: [...declarations],
})
export class AccordionModule {}
