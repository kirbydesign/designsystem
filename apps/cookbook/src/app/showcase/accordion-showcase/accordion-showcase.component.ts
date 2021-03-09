import { Component } from '@angular/core';
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
