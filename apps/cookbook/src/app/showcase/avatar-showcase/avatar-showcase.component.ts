import { Component } from '@angular/core';
import { AvatarSize } from '@kirbydesign/designsystem';
import { ExampleViewerComponent } from '../../shared/example-viewer/example-viewer.component';
import { AvatarExampleDefaultComponent } from '../../examples/avatar-example/examples/default';
import { AvatarExampleColorsComponent } from '../../examples/avatar-example/examples/colors';
import { AvatarExampleTextComponent } from '../../examples/avatar-example/examples/text';
import { AvatarExampleIconComponent } from '../../examples/avatar-example/examples/icon';
import { AvatarExampleBadgeComponent } from '../../examples/avatar-example/examples/badge';
import { AvatarExampleImageComponent } from '../../examples/avatar-example/examples/image';
import { AvatarExampleImageSizeComponent } from '../../examples/avatar-example/examples/image-sizes';
import { AvatarExampleImageLazyLoadingComponent } from '../../examples/avatar-example/examples/image-lazy-loading';
import { AvatarExampleImageErrorComponent } from '../../examples/avatar-example/examples/image-error';
import { ApiDescriptionPropertiesComponent } from '../../shared/api-description/api-description-properties/api-description-properties.component';
import { ApiDescriptionEventsComponent } from '../../shared/api-description/api-description-events/api-description-events.component';
import { ApiDescriptionProperty } from '~/app/shared/api-description/api-description-properties/api-description-properties.component';
import { ApiDescriptionEvent } from '~/app/shared/api-description/api-description-events/api-description-events.component';

@Component({
  selector: 'cookbook-avatar-showcase',
  templateUrl: './avatar-showcase.component.html',
  styleUrls: ['./avatar-showcase.component.scss'],
  imports: [
    ExampleViewerComponent,
    AvatarExampleDefaultComponent,
    AvatarExampleColorsComponent,
    AvatarExampleTextComponent,
    AvatarExampleIconComponent,
    AvatarExampleBadgeComponent,
    AvatarExampleImageComponent,
    AvatarExampleImageSizeComponent,
    AvatarExampleImageLazyLoadingComponent,
    AvatarExampleImageErrorComponent,
    ApiDescriptionPropertiesComponent,
    ApiDescriptionEventsComponent,
  ],
})
export class AvatarShowcaseComponent {
  properties: ApiDescriptionProperty[] = [
    {
      name: 'size',
      description: 'Sets the size of the avatar.',
      defaultValue: AvatarSize.SM,
      type: Object.values(AvatarSize),
    },
    {
      name: 'imageSrc',
      description: 'The path to the image you want to embed in the avatar.',
      defaultValue: 'undefined',
      type: ['string'],
    },
    {
      name: 'altText',
      description:
        'The alt text attribute that screenreaders use when "viewing" the image. Mandatory when using the avatar with an image.',
      defaultValue: 'undefined',
      type: ['string'],
    },
    {
      name: 'imageLoading',
      description:
        'Sets the loading attribute of the image.\n\nSee: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#loading',
      defaultValue: 'undefined',
      type: ['eager', 'lazy'],
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
