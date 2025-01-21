import { Component } from '@angular/core';
import { DividerComponent } from '@kirbydesign/designsystem/divider';
import exampleHtml from '../../examples/toggle-example/toggle-example.component.html?raw';
import { ToggleDefaultExampleComponent } from '../../examples/toggle-example/examples/default';
import { CodeViewerComponent } from '../../shared/code-viewer/code-viewer.component';
import { ExampleViewerComponent } from '../../shared/example-viewer/example-viewer.component';
import { ToggleReactiveFormsExampleComponent } from '../../examples/toggle-example/examples/reactive-forms';
import { ApiDescriptionPropertiesComponent } from '../../shared/api-description/api-description-properties/api-description-properties.component';
import { ApiDescriptionProperty } from '~/app/shared/api-description/api-description-properties/api-description-properties.component';

@Component({
  selector: 'cookbook-toggle-showcase',
  templateUrl: './toggle-showcase.component.html',
  styleUrls: ['./toggle-showcase.component.scss'],
  imports: [
    DividerComponent,
    ToggleDefaultExampleComponent,
    CodeViewerComponent,
    ExampleViewerComponent,
    ToggleReactiveFormsExampleComponent,
    ApiDescriptionPropertiesComponent,
  ],
})
export class ToggleShowcaseComponent {
  exampleHtml = exampleHtml;
  properties: ApiDescriptionProperty[] = [
    {
      name: 'checked',
      description: 'If true, the toggle is selected.',
      defaultValue: 'false',
      type: ['true', 'false'],
    },
    {
      name: 'disabled',
      description: 'If true, the toggle is disabled.',
      defaultValue: 'false',
      type: ['true', 'false'],
    },
    {
      name: 'checkedChange',
      description: 'Emits the checked state of the toggle on change (true | false).',
      defaultValue: '',
      type: ['event'],
    },
  ];
}
