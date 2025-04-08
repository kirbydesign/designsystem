import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DividerComponent } from '@kirbydesign/designsystem/divider';
import { ColorHelper } from '@kirbydesign/designsystem/helpers';
import { ToggleButtonDefaultExampleComponent } from '../../examples/toggle-button-example/examples/default';
import { ToggleButtonThemeColorExampleComponent } from '../../examples/toggle-button-example/examples/theme-color';
import { ToggleButtonDisabledExampleComponent } from '../../examples/toggle-button-example/examples/disabled';
import { ToggleButtonReactiveFormsExampleComponent } from '../../examples/toggle-button-example/examples/reactive-forms';
import { ExampleViewerComponent } from '../../shared/example-viewer/example-viewer.component';
import { ApiDescriptionPropertiesComponent } from '../../shared/api-description/api-description-properties/api-description-properties.component';
import { CodeViewerComponent } from '../../shared/code-viewer/code-viewer.component';
import { ApiDescriptionProperty } from '~/app/shared/api-description/api-description-properties/api-description-properties.component';

@Component({
  styleUrls: ['./toggle-button-showcase.component.scss'],
  templateUrl: './toggle-button-showcase.component.html',
  imports: [
    RouterLink,
    ToggleButtonDefaultExampleComponent,
    ToggleButtonThemeColorExampleComponent,
    ToggleButtonDisabledExampleComponent,
    ToggleButtonReactiveFormsExampleComponent,
    DividerComponent,
    ExampleViewerComponent,
    ApiDescriptionPropertiesComponent,
    CodeViewerComponent,
  ],
})
export class ToggleButtonShowcaseComponent {
  notificationColors = ColorHelper.notificationColors.map((color) => color.name);
  properties: ApiDescriptionProperty[] = [
    {
      name: 'checked',
      description: 'If true, the toggle button is selected.',
      defaultValue: 'false',
      type: ['true', 'false'],
    },
    {
      name: 'checkChanged',
      description: 'Emits the checked state of the toggle button on change (true | false).',
      defaultValue: '',
      type: ['event'],
    },
  ];
  buttonProperties: ApiDescriptionProperty[] = [
    {
      name: 'themeColor',
      description: `Sets the background color to the provided notification color.
        **Please note: Only applies when used inside a Toggle Button`,
      defaultValue: '',
      type: this.notificationColors,
    },
  ];
}
