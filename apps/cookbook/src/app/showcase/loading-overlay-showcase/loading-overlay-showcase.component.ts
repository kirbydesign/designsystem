import { Component } from '@angular/core';
import { ApiDescriptionProperty } from '~/app/shared/api-description/api-description-properties/api-description-properties.component';

declare var require: any;

@Component({
  selector: 'cookbook-loading-overlay-showcase',
  templateUrl: './loading-overlay-showcase.component.html',
})
export class LoadingOverlayShowcaseComponent {
  exampleHtml: string = require('!raw-loader!../../examples/loading-overlay-example/loading-overlay-example.component.html')
    .default;
  properties: ApiDescriptionProperty[] = [
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
