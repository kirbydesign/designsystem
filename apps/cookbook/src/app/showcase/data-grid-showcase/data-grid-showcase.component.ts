import { Component } from '@angular/core';
import { DataGridComponent } from '@kirbydesign/designsystem/data-grid';

@Component({
  selector: 'cookbook-data-grid-showcase',
  templateUrl: './data-grid-showcase.component.html',
  styleUrls: ['./data-grid-showcase.component.scss'],
  imports: [DataGridComponent],
})
export class DataGridShowcaseComponent {}
