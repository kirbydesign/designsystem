import { Component, OnInit } from '@angular/core';

import { ListSwipeAction, ToastConfig, ToastController } from '@kirbydesign/designsystem';

import { Transaction } from '../transaction';

import transactionsData from './transactions.json';

@Component({
  // tslint:disable-next-line
  templateUrl: 'home.page.html',
})
export class HomePageComponent implements OnInit {
  transactions: Transaction[] = [];

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

  onBtnSelect() {
    const config: ToastConfig = {
      message: 'Your toast message',
      messageType: 'warning',
      durationInMs: 10000,
    };
    this.toastController.showToast(config);
  }
}
