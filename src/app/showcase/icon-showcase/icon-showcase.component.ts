import { Component } from '@angular/core';

// import { ShowcaseProperty } from '~/app/shared/showcase-properties/showcase-property';

declare var require: any;

@Component({
  selector: 'kirby-icon-showcase',
  templateUrl: './icon-showcase.component.html',
})
export class IconShowcaseComponent {
  exampleHtml: string = require('../../examples/icon-example/icon-example.component.html');

  /*
  properties: ShowcaseProperty[] = [
    {
      name: 'hasShadow',
      description: 'Determines whether the button will have a shadow or not.',
      defaultValue: 'true',
      inputValues: ['boolean'],
    },
    {
      name: 'disabled',
      description: 'Determines whether the button will be disabled or not.',
      defaultValue: 'false',
      inputValues: ['boolean'],
    },
    {
      name: 'iconSrc',
      description: 'Points to the source of the icon, which will be used.',
      defaultValue: `'/assets/icons/add/add@3x.png'`,
      inputValues: ['string'],
    },
  ];
  */
}
