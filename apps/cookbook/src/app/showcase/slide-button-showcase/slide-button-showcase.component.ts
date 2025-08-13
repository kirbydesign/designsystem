import { Component } from '@angular/core';
import exampleHtml from '../../examples/slide-button-example/slide-button-example.component.html?raw';
import { SlideButtonExampleComponent } from '../../examples/slide-button-example/slide-button-example.component';
import { CodeViewerComponent } from '../../shared/code-viewer/code-viewer.component';
import { ApiDescriptionPropertiesComponent } from '../../shared/api-description/api-description-properties/api-description-properties.component';
import { ApiDescriptionProperty } from '~/app/shared/api-description/api-description-properties/api-description-properties.component';
import { ExampleViewerComponent } from '~/app/shared/example-viewer/example-viewer.component';
import { SimpleSlideButtonExampleComponent } from '~/app/examples/slide-button-example/examples/simple';
import { ExpandBlockSlideButtonExampleComponent } from '~/app/examples/slide-button-example/examples/expand-block';

@Component({
  selector: 'cookbook-slide-button-showcase',
  templateUrl: './slide-button-showcase.component.html',
  styleUrl: './slide-button-showcase.component.scss',
  imports: [
    CodeViewerComponent,
    ApiDescriptionPropertiesComponent,
    ExampleViewerComponent,
    SimpleSlideButtonExampleComponent,
    ExpandBlockSlideButtonExampleComponent,
  ],
})
export class SlideButtonShowcaseComponent {
  exampleHtml = exampleHtml;
  properties: ApiDescriptionProperty[] = [
    {
      name: 'expand',
      description:
        'If the button needs to expand to full width of its parent container, then use expand.',
      defaultValue: 'null',
      type: ['block'],
    },
    {
      name: 'text',
      description: 'The text to show in the slide button',
      defaultValue: '',
      type: ['string'],
    },
    {
      name: 'slideDone',
      description: 'Event triggered on slide done',
      defaultValue: null,
      type: ['event'],
    },
    {
      name: 'slidePercentageChanged',
      description: 'Event triggered when the slide percentage changes containing the percentage',
      defaultValue: null,
      type: ['number'],
    },
  ];
}
