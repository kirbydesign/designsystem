import { Component } from '@angular/core';
// @ts-expect-error TypeScript cannot provide types based on attributes yet
import exampleHtml from '../../examples/loading-overlay-example/loading-overlay-example.component.html' with {
  loader: 'text',
};
import {
  ApiDescriptionPropertiesComponent,
  ApiDescriptionProperty,
} from '../../shared/api-description/api-description-properties/api-description-properties.component';
import { ExampleViewerComponent } from '../../shared/example-viewer/example-viewer.component';
import { ImportViewerComponent } from '~/app/shared/import-code-viewer/import-code-viewer.component';
import { CardExampleComponent } from '~/app/examples/loading-overlay-example/examples/card';
import { DefaultExampleComponent } from '~/app/examples/loading-overlay-example/examples/default';
import { ServiceExampleComponent } from '~/app/examples/loading-overlay-example/examples/service';

@Component({
  selector: 'cookbook-loading-overlay-showcase',
  templateUrl: './loading-overlay-showcase.component.html',
  styleUrls: ['./loading-overlay-showcase.component.scss'],
  imports: [
    ExampleViewerComponent,
    ApiDescriptionPropertiesComponent,
    ImportViewerComponent,
    CardExampleComponent,
    DefaultExampleComponent,
    ServiceExampleComponent,
  ],
})
export class LoadingOverlayShowcaseComponent {
  exampleHtml = exampleHtml;
  properties: ApiDescriptionProperty[] = [
    {
      name: 'isLoading',
      description: 'Shows the loading spinner.',
      defaultValue: 'false',
      type: ['boolean'],
    },
    {
      name: 'showBackdrop',
      description: 'Adds a dimmer on the background.',
      defaultValue: 'true',
      type: ['boolean'],
    },
    {
      name: 'hideContent',
      description: 'Hides the content behind a backdrop with 100% opacity.',
      defaultValue: 'false',
      type: ['boolean'],
    },
  ];
}
