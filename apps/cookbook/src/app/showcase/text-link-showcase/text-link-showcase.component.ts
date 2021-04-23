import { Component } from '@angular/core';
import { ApiDescriptionProperty } from '~/app/shared/api-description/api-description-properties/api-description-properties.component';

import { TextLinkSize } from '@kirbydesign/designsystem';

@Component({
  selector: 'cookbook-text-link-showcase',
  templateUrl: './text-link-showcase.component.html',
  styleUrls: ['../_showcase.shared.scss'],
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
      type: Object.values(TextLinkSize).slice(0, 3),
    },
    {
      name: 'text',
      description: 'The text shown within the link',
      defaultValue: 'null',
      type: ['string'],
    },
    {
      name: 'target',
      description: 'The browsing context where the link should be displayed.',
      defaultValue: '_blank',
      type: ['_self', '_blank', '_parent', '_top'],
    },
  ];
}
