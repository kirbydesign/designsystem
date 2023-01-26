import { Component } from '@angular/core';
import { ApiDescriptionProperty } from '~/app/shared/api-description/api-description-properties/api-description-properties.component';

@Component({
  selector: 'cookbook-action-list-showcase',
  templateUrl: './action-list-showcase.component.html',
  styleUrls: ['./action-list-showcase.component.scss'],
})
export class ActionListShowcaseComponent {
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
}
