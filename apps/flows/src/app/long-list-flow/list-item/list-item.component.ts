import { Component, Input } from '@angular/core';

import { Transaction } from '../transaction';

@Component({
  selector: 'flows-list-item',
  templateUrl: './list-item.component.html',
})
export class ListItemComponent {
  @Input() transaction: Transaction;
}
