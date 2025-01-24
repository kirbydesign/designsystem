import { Component } from '@angular/core';
import { ExampleViewerComponent } from '../../shared/example-viewer/example-viewer.component';
import { AccordionDefaultExampleComponent } from '../../examples/accordion-example/examples/default';
import { AccordionExpandedExampleComponent } from '../../examples/accordion-example/examples/expanded';
import { AccordionCardExampleComponent } from '../../examples/accordion-example/examples/card';
import { AccordionWithListExampleComponent } from '../../examples/accordion-example/examples/list';
import { AccordionWithItemsInCardExampleComponent } from '../../examples/accordion-example/examples/card-list';
import { AccordionEventsExampleComponent } from '../../examples/accordion-example/examples/events';
import { ApiDescriptionPropertiesComponent } from '../../shared/api-description/api-description-properties/api-description-properties.component';
import { ApiDescriptionEventsComponent } from '../../shared/api-description/api-description-events/api-description-events.component';
import { ApiDescriptionProperty } from '~/app/shared/api-description/api-description-properties/api-description-properties.component';
import { ApiDescriptionEvent } from '~/app/shared/api-description/api-description-events/api-description-events.component';

@Component({
  selector: 'cookbook-accordion-showcase',
  templateUrl: './accordion-showcase.component.html',
  styleUrls: ['./accordion-showcase.component.scss'],
  imports: [
    ExampleViewerComponent,
    AccordionDefaultExampleComponent,
    AccordionExpandedExampleComponent,
    AccordionCardExampleComponent,
    AccordionWithListExampleComponent,
    AccordionWithItemsInCardExampleComponent,
    AccordionEventsExampleComponent,
    ApiDescriptionPropertiesComponent,
    ApiDescriptionEventsComponent,
  ],
})
export class AccordionShowcaseComponent {
  properties: ApiDescriptionProperty[] = [
    {
      name: 'title',
      description: 'The title that you can click to show the content',
      defaultValue: 'null',
      type: ['string'],
    },
    {
      name: 'isExpanded',
      description: 'Should the content be initially shown',
      defaultValue: 'false',
      type: ['boolean'],
    },
    {
      name: 'isDisabled',
      description: 'Disables expansion of the item and styles it as disabled.',
      defaultValue: 'false',
      type: ['boolean'],
    },
    {
      name: 'disabledTitle',
      description:
        'Optional title shown when isDisabled is true - if null then the title property will be used ',
      defaultValue: 'null',
      type: ['string'],
    },
    {
      name: 'hasPadding',
      description:
        'If set, the accordion item will have spacing between the border and the content',
      defaultValue: 'true',
      type: ['boolean'],
    },
  ];
  events: ApiDescriptionEvent[] = [
    {
      name: 'toggle',
      description: 'Emitted when the state of the accordion item has changed',
      signature: 'EventEmitter<boolean>',
    },
  ];
}
