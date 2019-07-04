import { Component, OnInit } from '@angular/core';

import { Sizes } from '@kirbydesign/designsystem/directives/size/size.directive';

import { ShowcaseProperty } from '~/app/shared/showcase-properties/showcase-property';
declare var require: any;

@Component({
  selector: 'kirby-avatar-showcase',
  templateUrl: './avatar-showcase.component.html',
  styleUrls: ['./avatar-showcase.component.scss'],
})
export class AvatarShowcaseComponent implements OnInit {
  exampleHtml: string = require('../../examples/avatar-example/avatar-example.component.html');
  properties: ShowcaseProperty[] = [
    {
      name: 'imageSrc',
      description: 'Points to the src of the image location',
      defaultValue: 'null',
      inputValues: ['string'],
    },
    {
      name: 'size',
      description: 'Sets the size of the avatar.',
      defaultValue: 'sm',
      inputValues: Object.values(Sizes),
    },
    {
      name: 'altText',
      description:
        'Must be filled out - its the alt text attribute that screenreaders use when "viewing" the image.',
      defaultValue: 'null',
      inputValues: ['string'],
    },
    {
      name: 'overlay',
      description:
        'Adds a dimmed overlay on the avatar. Useful when using the avatar on a white background and the image also has a white background.',
      defaultValue: 'false',
      inputValues: ['true', 'false'],
    },
    {
      name: 'shadow',
      description: 'Adds a box-shadow to the avatar.',
      defaultValue: 'false',
      inputValues: ['true', 'false'],
    },
  ];
  constructor() {}

  ngOnInit() {}
}
