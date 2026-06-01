import { Component } from '@angular/core';
import { ToggleReactiveFormsExampleComponent } from './examples/reactive-forms';
import { ToggleItemExampleComponent } from './examples/item';
import { ToggleStateExampleComponent } from './examples/state';

@Component({
  selector: 'cookbook-toggle-example',
  templateUrl: './toggle-example.component.html',
  styleUrls: ['./toggle-example.component.scss'],
  imports: [
    ToggleReactiveFormsExampleComponent,
    ToggleItemExampleComponent,
    ToggleStateExampleComponent,
  ],
})
export class ToggleExampleComponent {}
