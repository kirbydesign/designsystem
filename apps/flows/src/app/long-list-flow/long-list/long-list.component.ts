import { Component, OnInit } from '@angular/core';

import { ListSwipeAction, ToastConfig, ToastController } from '@kirbydesign/designsystem';

import { Transaction } from '../../transaction';
import transactionsData from '../../transactions-data.json';

@Component({
  selector: 'long-list',
  templateUrl: './long-list.component.html',
  styleUrls: ['./long-list.component.scss'],
  standalone: false,
})
export class LongListComponent implements OnInit {
  transactions: Transaction[];
  transactionSections: Map<string, { transactions: Transaction[] }>;

  listMode: 'default' | 'experimental' = 'default';

  constructor(private toastController: ToastController) {}

  swipeActions: ListSwipeAction[] = [
    {
      position: 'left',
      title: 'Archive',
      type: 'warning',
      onSelected: (item) => console.log(item),
    },
    {
      position: 'left',
      title: 'Flag',
      icon: 'flag',
      type: 'success',
      onSelected: (item) => console.log(item),
    },
    {
      position: 'right',
      title: 'Delete',
      icon: 'trash',
      type: 'danger',
      onSelected: (item) => console.log(item),
    },
  ];

  ngOnInit(): void {
    this.transactions = transactionsData.transactions;

    this.transactionSections = new Map<string, { transactions: Transaction[] }>();

    this.transactions.forEach((transaction) => {
      const sectionName = this.getSectionName(transaction);
      const section = this.transactionSections.get(sectionName);

      if (section) {
        section.transactions.push(transaction);
      } else {
        this.transactionSections.set(sectionName, { transactions: [transaction] });
      }
    });
  }

  getSectionName(transaction: Transaction): string {
    return transaction.date.utc;
  }

  onCogSelect() {
    const config: ToastConfig = {
      message: 'Your toast message',
      messageType: 'success',
      durationInMs: 10000,
    };
    this.toastController.showToast(config);
  }

  onModeSelect() {
    this.listMode = this.listMode === 'default' ? 'experimental' : 'default';
  }
}
