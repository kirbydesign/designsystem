import { Directive } from '@angular/core';

@Directive({
  selector: 'table[kirbyDataGridTable]',
  standalone: true,
  host: { class: 'kirby-table' },
})
export class DataGridTableDirective {}
