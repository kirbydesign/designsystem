import { Component } from '@angular/core';
import { ShowcaseProperty } from '~/app/shared/showcase-properties/showcase-properties.component';

@Component({
  selector: 'cookbook-accordion-showcase',
  templateUrl: './accordion-showcase.component.html',
  styleUrls: ['./accordion-showcase.component.scss'],
})
export class AccordionShowcaseComponent {
  properties: ShowcaseProperty[] = [
    {
      name: 'title',
      description: 'The title that you can click to show the content',
      defaultValue: 'null',
      inputValues: ['string'],
    },
    {
      name: 'isExpanded',
      description: 'Should the content be initially shown',
      defaultValue: 'false',
      inputValues: ['boolean'],
    },
  ];
}
