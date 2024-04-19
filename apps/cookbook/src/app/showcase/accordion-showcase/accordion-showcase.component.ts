import { Component } from '@angular/core';
import { ApiDescriptionEvent } from '~/app/shared/api-description/api-description-events/api-description-events.component';
import { ApiDescriptionProperty } from '~/app/shared/api-description/api-description-properties/api-description-properties.component';

@Component({
  selector: 'cookbook-accordion-showcase',
  templateUrl: './accordion-showcase.component.html',
  styleUrls: ['./accordion-showcase.component.scss'],
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
  ];
  events: ApiDescriptionEvent[] = [
    {
      name: 'toggle',
      description: 'Emitted when the state of the accordion item has changed',
      signature: 'EventEmitter<boolean>',
    },
  ];
}
