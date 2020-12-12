import { Component, OnInit } from '@angular/core';

import { Sizes } from '@kirbydesign/designsystem';
import { ShowcaseProperty } from '~/app/shared/showcase-properties/showcase-property';

@Component({
  selector: 'cookbook-text-link-showcase',
  templateUrl: './text-link-showcase.component.html',
  styleUrls: ['./text-link-showcase.component.scss'],
})
export class TextLinkShowcaseComponent {
  properties: ShowcaseProperty[] = [
    {
      name: 'link',
      description: 'The navigation link (internal or external)',
      defaultValue: 'null',
      inputValues: ['string'],
    },
    {
      name: 'size',
      description: 'Sets the size of the link.',
      defaultValue: 'md',
      inputValues: Object.values(Sizes).slice(0, 3),
    },
    {
      name: 'text',
      description: 'The text shown within the link',
      defaultValue: 'null',
      inputValues: ['string'],
    },
  ];
}
