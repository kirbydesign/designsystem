import { Component, OnInit } from '@angular/core';
import { ApiDescriptionProperty } from '~/app/shared/api-description/api-description-properties/api-description-properties.component';

import { Sizes } from '@kirbydesign/designsystem';

declare var require: any;

@Component({
  selector: 'cookbook-avatar-showcase',
  templateUrl: './avatar-showcase.component.html',
  styleUrls: ['./avatar-showcase.component.scss'],
})
export class AvatarShowcaseComponent implements OnInit {
  properties: ApiDescriptionProperty[] = [
    {
      name: 'imageSrc',
      description: 'Points to the src of the image location',
      defaultValue: 'null',
      type: ['string'],
    },
    {
      name: 'size',
      description: 'Sets the size of the avatar.',
      defaultValue: 'sm',
      type: Object.values(Sizes),
    },
    {
      name: 'altText',
      description:
        'Must be filled out - its the alt text attribute that screenreaders use when "viewing" the image.',
      defaultValue: 'null',
      type: ['string'],
    },
    {
      name: 'overlay',
      description:
        'Adds a dimmed overlay on the avatar. Useful when using the avatar on a white background and the image also has a white background.',
      defaultValue: 'false',
      type: ['true', 'false'],
    },
    {
      name: 'shadow',
      description: 'Adds a box-shadow to the avatar.',
      defaultValue: 'false',
      type: ['true', 'false'],
    },
  ];
  constructor() {}

  ngOnInit() {}
}
