import { Component } from '@angular/core';
import { ToggleReactiveFormsExampleComponent } from './examples/reactive-forms';
import { ToggleItemExampleComponent } from './examples/item';

@Component({
  selector: 'cookbook-toggle-example',
  templateUrl: './toggle-example.component.html',
  styleUrls: ['./toggle-example.component.scss'],
  imports: [ToggleReactiveFormsExampleComponent, ToggleItemExampleComponent],
})
export class ToggleExampleComponent {}
