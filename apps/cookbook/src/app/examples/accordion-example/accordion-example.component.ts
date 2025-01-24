import { Component } from '@angular/core';
import { ToastController, ToastHelper } from '@kirbydesign/designsystem/toast';
import { AccordionDefaultExampleComponent } from './examples/default';
import { AccordionExpandedExampleComponent } from './examples/expanded';
import { AccordionCardExampleComponent } from './examples/card';
import { AccordionWithListExampleComponent } from './examples/list';
import { AccordionWithItemsInCardExampleComponent } from './examples/card-list';
import { AccordionEventsExampleComponent } from './examples/events';

@Component({
  selector: 'cookbook-accordion-example',
  templateUrl: './accordion-example.component.html',
  styleUrls: ['./accordion-example.component.scss'],
  imports: [
    AccordionDefaultExampleComponent,
    AccordionExpandedExampleComponent,
    AccordionCardExampleComponent,
    AccordionWithListExampleComponent,
    AccordionWithItemsInCardExampleComponent,
    AccordionEventsExampleComponent,
  ],
  providers: [ToastHelper, ToastController],
})
export class AccordionExampleComponent {}
