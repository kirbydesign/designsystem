import { Component, Input } from '@angular/core';

import { Transaction } from '../transaction';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'transaction-item',
  templateUrl: './transaction-item.component.html',
})
export class TransactionItemComponent {
  @Input() transaction: Transaction;
}
