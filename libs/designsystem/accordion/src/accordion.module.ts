import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconModule } from '@kirbydesign/designsystem/icon';

import { AccordionItemComponent } from './accordion-item.component';
import { AccordionDirective } from './accordion.directive';

const declarations = [AccordionDirective, AccordionItemComponent];

@NgModule({
  declarations: [...declarations],
  imports: [BrowserAnimationsModule, IconModule],
  exports: [...declarations],
})
export class AccordionModule {}
