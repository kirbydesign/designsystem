import { Component } from '@angular/core';
import { DataGridDefaultExampleComponent } from './examples/default';

@Component({
  selector: 'cookbook-data-grid-example',
  templateUrl: './data-grid-example.component.html',
  styleUrls: ['../_examples.shared.scss'],
  imports: [DataGridDefaultExampleComponent],
})
export class DataGridExampleComponent {}
