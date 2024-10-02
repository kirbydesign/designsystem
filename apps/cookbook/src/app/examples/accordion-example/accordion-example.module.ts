import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ListModule } from '@kirbydesign/designsystem/list';
import { CardModule } from '@kirbydesign/designsystem/card';
import { AccordionModule } from '@kirbydesign/designsystem/accordion';
import { ItemModule } from '@kirbydesign/designsystem/item';
import { DividerComponent } from '@kirbydesign/designsystem/divider';
import { ToastController, ToastHelper } from '@kirbydesign/designsystem/toast';
import { AccordionCardExampleComponent } from './examples/card';
import { AccordionDefaultExampleComponent } from './examples/default';
import { AccordionExpandedExampleComponent } from './examples/expanded';
import { AccordionEventsExampleComponent } from './examples/events';
import { AccordionWithListExampleComponent } from './examples/list';
import { AccordionWithItemsInCardExampleComponent } from './examples/card-list';
import { AccordionExampleComponent } from './accordion-example.component';

const COMPONENT_DECLARATIONS = [
  AccordionExampleComponent,
  AccordionCardExampleComponent,
  AccordionDefaultExampleComponent,
  AccordionExpandedExampleComponent,
  AccordionEventsExampleComponent,
  AccordionWithListExampleComponent,
  AccordionWithItemsInCardExampleComponent,
];

@NgModule({
  imports: [CommonModule, CardModule, AccordionModule, ItemModule, DividerComponent, ListModule],
  providers: [ToastHelper, ToastController],
  declarations: COMPONENT_DECLARATIONS,
  exports: COMPONENT_DECLARATIONS,
})
export class AccordionExampleModule {}
