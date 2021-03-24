import { Component } from '@angular/core';
import { ApiDescriptionProperty } from '~/app/shared/api-description/api-description-properties/api-description-properties.component';

import { Sizes } from '@kirbydesign/designsystem';

@Component({
  selector: 'cookbook-text-link-showcase',
  templateUrl: './text-link-showcase.component.html',
})
export class TextLinkShowcaseComponent {
  properties: ApiDescriptionProperty[] = [
    {
      name: 'route',
      description: 'The navigation link (internal or external)',
      defaultValue: 'null',
      type: ['string'],
    },
    {
      name: 'size',
      description: 'Sets the size of the link.',
      defaultValue: 'md',
      type: Object.values(Sizes).slice(0, 3),
    },
    {
      name: 'text',
      description: 'The text shown within the link',
      defaultValue: 'null',
      type: ['string'],
    },
  ];
}
