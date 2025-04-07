import { Component } from '@angular/core';
import { ToggleButtonDefaultExampleComponent } from './examples/default';
import { ToggleButtonThemeColorExampleComponent } from './examples/theme-color';
import { ToggleButtonDisabledExampleComponent } from './examples/disabled';
import { ToggleButtonReactiveFormsExampleComponent } from './examples/reactive-forms';

@Component({
  selector: 'cookbook-toggle-button-example',
  templateUrl: 'toggle-button-example.component.html',
  styleUrls: ['./toggle-button-example.component.scss'],
  imports: [
    ToggleButtonDefaultExampleComponent,
    ToggleButtonThemeColorExampleComponent,
    ToggleButtonDisabledExampleComponent,
    ToggleButtonReactiveFormsExampleComponent,
  ],
})
export class ToggleButtonExampleComponent {}
