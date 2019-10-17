import { Component } from '@angular/core';

import { ShowcaseProperty } from '~/app/shared/showcase-properties/showcase-property';
declare var require: any;

@Component({
  selector: 'kirby-loading-overlay-showcase',
  templateUrl: './loading-overlay-showcase.component.html',
})
export class LoadingOverlayShowcaseComponent {
  exampleHtml: string = require('!raw-loader!../../examples/loading-overlay-example/loading-overlay-example.component.html')
    .default;
  properties: ShowcaseProperty[] = [
    {
      name: 'isLoading',
      description: 'Shows the loading spinner.',
      defaultValue: 'false',
      inputValues: ['true', 'false'],
    },
    {
      name: 'showBackdrop',
      description: 'Adds a dimmer on the background.',
      defaultValue: 'true',
      inputValues: ['true', 'false'],
    },
  ];
}
