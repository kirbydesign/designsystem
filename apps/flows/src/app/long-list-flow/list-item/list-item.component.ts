import { Component, Input } from '@angular/core';

import { Transaction } from '../../transaction';

@Component({
  selector: 'list-item',
  templateUrl: './list-item.component.html',
  standalone: false,
})
export class ListItemComponent {
  @Input() transaction: Transaction;
}
