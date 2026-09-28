import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'kirby-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataGridComponent {}
