import { Component } from '@angular/core';

import { ListSwipeAction } from '@kirbydesign/designsystem';
import { ToastConfig, ToastController } from '@kirbydesign/designsystem';
import { ListModule } from '@kirbydesign/designsystem/list';
import { ItemModule } from '@kirbydesign/designsystem/item';
import { NgIf } from '@angular/common';

@Component({
  selector: 'cookbook-list-swipe-example',
  templateUrl: './list-swipe-example.component.html',
  styleUrls: ['./list-swipe-example.component.scss'],
  imports: [ListModule, ItemModule, NgIf],
})
export class ListSwipeExampleComponent {
  items: any[] = [
    {
      id: 0,
      title: 'Vestas Wind Systems',
      subTitle: '2000 pcs',
      amount: '5.587.218.309 DKK',
      detail: 225,
      archived: true,
      flagged: false,
      color: 'default',
    },
    {
      id: 1,
      title: 'Cypress Semiconductor Corporation',
      subTitle: '1827 pcs',
      amount: '76.980 DKK',
      detail: -3,
      flagged: true,
      deleted: true,
      color: 'light',
    },
    {
      id: 2,
      title: 'Ultragenyx Pharmaceutical Inc.',
      subTitle: '787 pcs',
      amount: '83.004 DKK',
      detail: -115,
      color: 'white',
    },
    {
      id: 3,
      title: 'Trans World Entertainment Corp. [disabled]',
      subTitle: '467 pcs',
      amount: '60.963 DKK',
      detail: 6,
      color: 'light',
    },
    {
      id: 4,
      title: 'Astronics Corporation',
      subTitle: '791 pcs',
      amount: '33.830 DKK',
      detail: -154,
      color: 'white',
    },
    {
      id: 5,
      title: 'Riverview Bancorp Inc',
      subTitle: '206 pcs',
      amount: '60.775 DKK',
      detail: 98,
      color: 'light',
    },
    {
      id: 6,
      title: 'Haemonetics Corporation',
      subTitle: '988 pcs',
      amount: '61.196 DKK',
      detail: 220,
      color: 'white',
    },
    {
      id: 7,
      title: 'PJT Partners Inc.',
      subTitle: '1706 pcs',
      amount: '52.441 DKK',
      detail: 129,
      color: 'light',
    },
  ];

  swipeActions: ListSwipeAction[] = [
    {
      position: 'left',
      title: 'Archive',
      type: 'warning',
      onSelected: (item) => this.onArchiveItem(item),
      isDisabled: (item) => item.archived || item.id === 3,
    },
    {
      position: 'left',
      title: (item) => (item.flagged ? 'Remove flag' : 'Flag'),
      icon: (item) => (item.flagged ? null : 'flag'),
      type: 'success',
      onSelected: (item) => this.onFlagItem(item),
      isDisabled: (item) => item.id === 3,
    },
    {
      position: 'right',
      title: (item) => (item.deleted ? 'Restore' : 'Delete'),
      icon: (item) => (item.deleted ? 'swap' : 'trash'),
      type: (item) => (item.deleted ? 'warning' : 'danger'),
      onSelected: (item) => (item.deleted ? this.onRestoreItem(item) : this.onDeleteItem(item)),
      isDisabled: (item) => item.id === 3,
    },
  ];

  constructor(private toastController: ToastController) {}

  private onArchiveItem(item: any): void {
    // supposing that there should be a call to the back-end here...
    item.archived = !item.archived;
    const config: ToastConfig = {
      message: `Item '${item.title}' has been archived.`,
      messageType: 'warning',
      durationInMs: 1500,
    };
    this.toastController.showToast(config);
  }

  private onFlagItem(item: any): void {
    // supposing that there should be a call to the back-end here...
    item.flagged = !item.flagged;
    const flagState = item.flagged ? 'flagged' : 'un-flagged';
    const config: ToastConfig = {
      message: `Item '${item.title}' has been ${flagState}.`,
      messageType: 'success',
      durationInMs: 1500,
    };
    this.toastController.showToast(config);
  }

  private onDeleteItem(item: any): void {
    // supposing that there should be a call to the back-end here...
    item.deleted = !item.deleted;
    const config: ToastConfig = {
      message: `Item '${item.title}' has been deleted.`,
      messageType: 'warning',
      durationInMs: 1500,
    };
    this.toastController.showToast(config);
  }

  private onRestoreItem(item: any): void {
    // supposing that there should be a call to the back-end here...
    item.deleted = !item.deleted;
    const config: ToastConfig = {
      message: `Item '${item.title}' has been restored.`,
      messageType: 'warning',
      durationInMs: 1500,
    };
    this.toastController.showToast(config);
  }
}
