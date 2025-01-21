import { Component } from '@angular/core';
import { ToggleDefaultExampleComponent } from './examples/default';
import { ToggleReactiveFormsExampleComponent } from './examples/reactive-forms';

@Component({
  selector: 'cookbook-toggle-example',
  templateUrl: './toggle-example.component.html',
  styleUrls: ['./toggle-example.component.scss'],
  imports: [ToggleDefaultExampleComponent, ToggleReactiveFormsExampleComponent],
})
export class ToggleExampleComponent {}
