import { Component } from '@angular/core';
import { ExampleViewerComponent } from '../../shared/example-viewer/example-viewer.component';
import { FlagExampleColorsComponent } from '../../examples/flag-example/examples/colors';
import { FlagExampleSizesComponent } from '../../examples/flag-example/examples/sizes';
import { ApiDescriptionPropertiesComponent } from '../../shared/api-description/api-description-properties/api-description-properties.component';
import { ApiDescriptionProperty } from '~/app/shared/api-description/api-description-properties/api-description-properties.component';

@Component({
  selector: 'cookbook-flag-showcase',
  templateUrl: './flag-showcase.component.html',
  styleUrls: ['./flag-showcase.component.scss'],
  imports: [
    ExampleViewerComponent,
    FlagExampleColorsComponent,
    FlagExampleSizesComponent,
    ApiDescriptionPropertiesComponent,
  ],
})
export class FlagShowcaseComponent {
  properties: ApiDescriptionProperty[] = [
    {
      name: 'themeColor',
      description: 'Sets which color the flag should use.',
      defaultValue: 'transparent',
      type: ['success', 'warning', 'danger', 'semi-light', 'transparent'],
    },
    {
      name: 'size',
      description: 'Sets the size of the flag.',
      defaultValue: 'md',
      type: ['xs', 'sm', 'md'],
    },
  ];
}
