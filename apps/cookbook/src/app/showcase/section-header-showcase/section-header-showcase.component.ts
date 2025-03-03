import { Component } from '@angular/core';
import { SectionHeaderHeadingWithLabelExampleComponent } from '../../examples/section-header-example/examples/heading-with-label';
import { ExampleViewerComponent } from '../../shared/example-viewer/example-viewer.component';
import { SectionHeaderLabelAndDetailExampleComponent } from '../../examples/section-header-example/examples/label-and-detail';
import { SectionHeaderHeadingWithMultilineLabelExampleComponent } from '../../examples/section-header-example/examples/heading-with-multiline-label';
import { SectionHeaderWithCardComponent } from '../../examples/section-header-example/examples/header-with-card';
import { ApiDescriptionPropertiesComponent } from '../../shared/api-description/api-description-properties/api-description-properties.component';
import {
  ApiDescriptionProperty,
  ApiDescriptionPropertyColumns,
} from '~/app/shared/api-description/api-description-properties/api-description-properties.component';

@Component({
  selector: 'cookbook-section-header-showcase',
  templateUrl: './section-header-showcase.component.html',
  styleUrls: ['./section-header-showcase.component.scss'],
  imports: [
    SectionHeaderHeadingWithLabelExampleComponent,
    ExampleViewerComponent,
    SectionHeaderLabelAndDetailExampleComponent,
    SectionHeaderHeadingWithMultilineLabelExampleComponent,
    SectionHeaderWithCardComponent,
    ApiDescriptionPropertiesComponent,
  ],
})
export class SectionHeaderShowcaseComponent {
  _cssCustomPropertiesColumns: ApiDescriptionPropertyColumns = {
    name: 'Name',
    description: 'Description',
    default: 'Default',
  };

  _cssCustomProperties: ApiDescriptionProperty[] = [
    {
      name: '--kirby-section-header-color',
      description:
        'Sets the color property of the section header. This changes the color of the text slotted within, when using heading, label or detail.',
      defaultValue: 'black',
    },
  ];
}
