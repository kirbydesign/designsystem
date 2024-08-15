import { Component } from '@angular/core';
import { AvatarSize } from '@kirbydesign/designsystem';
import { ApiDescriptionEvent } from '~/app/shared/api-description/api-description-events/api-description-events.component';
import { ApiDescriptionProperty } from '~/app/shared/api-description/api-description-properties/api-description-properties.component';

@Component({
  selector: 'cookbook-avatar-showcase',
  templateUrl: './avatar-showcase.component.html',
  styleUrls: ['./avatar-showcase.component.scss'],
})
export class AvatarShowcaseComponent {
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
      defaultValue: AvatarSize.SM,
      type: Object.values(AvatarSize),
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
      name: 'shadow (deprecated - use stroke instead)',
      description: 'Adds a box-shadow to the avatar.',
      defaultValue: 'false',
      type: ['true', 'false'],
    },
    {
      name: 'stroke',
      description: 'Adds an outline to the avatar.',
      defaultValue: 'false',
      type: ['true', 'false'],
    },
  ];

  events: ApiDescriptionEvent[] = [
    {
      name: 'imageError',
      description:
        'Emitted when the loading of an avatar image results in an error - usually due to the specified imageSrc not being found.',
      signature: '(ErrorEvent) => void',
    },
  ];
}
