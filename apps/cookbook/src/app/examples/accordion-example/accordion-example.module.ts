import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CardModule } from '@kirbydesign/designsystem/card';
import { AccordionModule } from '@kirbydesign/designsystem/accordion';
import { ItemModule } from '@kirbydesign/designsystem/item';
import { DividerComponent } from '@kirbydesign/designsystem/divider';
import { ToastController, ToastHelper } from '@kirbydesign/designsystem/toast';
import { AccordionCardExampleComponent } from './examples/card';
import { AccordionDefaultExampleComponent } from './examples/default';
import { AccordionExpandedExampleComponent } from './examples/expanded';
import { AccordionEventsExampleComponent } from './examples/events';
import { AccordionWithItemsExampleComponent } from './examples/list-items';
import { AccordionExampleComponent } from './accordion-example.component';

const COMPONENT_DECLARATIONS = [
  AccordionExampleComponent,
  AccordionCardExampleComponent,
  AccordionDefaultExampleComponent,
  AccordionExpandedExampleComponent,
  AccordionEventsExampleComponent,
  AccordionWithItemsExampleComponent,
];

@NgModule({
  imports: [CommonModule, CardModule, AccordionModule, ItemModule, DividerComponent],
  providers: [ToastHelper, ToastController],
  declarations: COMPONENT_DECLARATIONS,
  exports: COMPONENT_DECLARATIONS,
})
export class AccordionExampleModule {}
