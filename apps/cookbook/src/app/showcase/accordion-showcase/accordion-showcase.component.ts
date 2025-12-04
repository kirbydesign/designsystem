import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IconComponent } from '@kirbydesign/designsystem';
import { AccordionDirective } from '@kirbydesign/designsystem/accordion';
import { ExampleViewerComponent } from '../../shared/example-viewer/example-viewer.component';
import { AccordionDefaultExampleComponent } from '../../examples/accordion-example/examples/default';
import { AccordionExpandedExampleComponent } from '../../examples/accordion-example/examples/expanded';
import { AccordionCardExampleComponent } from '../../examples/accordion-example/examples/card';
import { AccordionWithListExampleComponent } from '../../examples/accordion-example/examples/list';
import { AccordionWithItemsInCardExampleComponent } from '../../examples/accordion-example/examples/card-list';
import { AccordionEventsExampleComponent } from '../../examples/accordion-example/examples/events';
import { ApiDescriptionPropertiesComponent } from '../../shared/api-description/api-description-properties/api-description-properties.component';
import { ApiDescriptionEventsComponent } from '../../shared/api-description/api-description-events/api-description-events.component';
import { KirbyAccordionItemElement } from '../../../../../../libs/core/dist/accordion';
import { ApiDescriptionProperty } from '~/app/shared/api-description/api-description-properties/api-description-properties.component';
import { ApiDescriptionEvent } from '~/app/shared/api-description/api-description-events/api-description-events.component';
import { AccordionHeadingLevelExampleComponent } from '~/app/examples/accordion-example/examples/heading-level';
import { ImportViewerComponent } from '~/app/shared/import-code-viewer/import-code-viewer.component';

@Component({
  selector: 'cookbook-accordion-showcase',
  templateUrl: './accordion-showcase.component.html',
  styleUrls: ['./accordion-showcase.component.scss'],
  imports: [
    ExampleViewerComponent,
    ImportViewerComponent,
    AccordionDefaultExampleComponent,
    AccordionExpandedExampleComponent,
    AccordionCardExampleComponent,
    AccordionWithListExampleComponent,
    AccordionWithItemsInCardExampleComponent,
    AccordionEventsExampleComponent,
    AccordionHeadingLevelExampleComponent,
    ApiDescriptionPropertiesComponent,
    ApiDescriptionEventsComponent,
    IconComponent,
    AccordionDirective,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AccordionShowcaseComponent {
  constructor() {
    KirbyAccordionItemElement.define();
  }
  accordionProperties: ApiDescriptionProperty[] = [
    {
      name: 'headingLevel',
      description:
        'If set, all accordion item titles within the accordion will render as a heading of that level',
      defaultValue: 'null',
      type: ['1 | 2 | 3 | 4 | 5 | 6'],
    },
  ];
  accordionItemProperties: ApiDescriptionProperty[] = [
    {
      name: 'title',
      description:
        'The title for the accordion item. When activated, it will show/hide the accordion item content',
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
      description: 'Disables expansion of the item and styles it as disabled',
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
    {
      name: 'headingLevel',
      description: 'If set, the accordion item title will render as a heading of that level',
      defaultValue: 'null',
      type: ['1 | 2 | 3 | 4 | 5 | 6'],
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
