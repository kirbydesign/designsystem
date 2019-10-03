import { Component } from '@angular/core';

import { ActionSheetItem, ActionSheetConfig } from '@kirbydesign/designsystem/modal';
import { ToastConfig, ToastController } from '@kirbydesign/designsystem';
import { ModalController } from '@kirbydesign/designsystem/modal';

import { BasePageExampleComponent } from '../base-page-example.component';

const config = {
  template: `<kirby-page defaultBackHref="/">

  <!-- Custom Page Title -->
  <div *kirbyPageStickyTitle style="display: inline-flex;">
    Custom
    <kirby-icon name="arrow-down"></kirby-icon>
  </div>
  
  <!-- Page Actions -->
  <kirby-page-actions *kirbyPageStickyActions>
    <button kirby-button (click)="onCogSelect()">
      <kirby-icon name="cog"></kirby-icon>
    </button>
    <button kirby-button (click)="onMoreSelect()">
      <kirby-icon name="more"></kirby-icon>
    </button>
  </kirby-page-actions>
  
  <!-- Content Template (without kirby-page-content wrapper) -->
  <div *kirbyPageContent [innerHTML]="content"></div>
  
  <!-- Fixed Content -->
  <kirby-fab-sheet *kirbyPageContentFixed horizontalAlignment="right">
    <kirby-icon name="write-message"></kirby-icon>
    <kirby-action-sheet
      header="Your action sheet header"
      subheader="Your action sheet subheader"
      [items]="items"
      (itemSelect)="onItemSelect($event)">
    </kirby-action-sheet>
  </kirby-fab-sheet>
</kirby-page>`,
};
@Component({
  template: config.template,
  styleUrls: ['../base-page-example.component.scss'],
})
export class PageAdvancedExampleComponent extends BasePageExampleComponent {
  static readonly template = config.template.replace(' defaultBackHref="/"', '');

  items: ActionSheetItem[] = [
    { id: '1', text: 'Option 1' },
    { id: '2', text: 'Option 2' },
    { id: '3', text: 'Option 3' },
  ];

  constructor(private toastController: ToastController, private modalController: ModalController) {
    super();
  }

  onItemSelect(item: ActionSheetItem) {
    if (!item) {
      return;
    }
    const config: ToastConfig = {
      message: `'${item.text}' was selected.`,
      messageType: 'success',
      durationInMs: 1500,
    };
    this.toastController.showToast(config);
  }

  onCogSelect() {
    const config: ToastConfig = {
      message: 'Settings was selected.',
      messageType: 'success',
      durationInMs: 1500,
    };
    this.toastController.showToast(config);
  }

  onMoreSelect() {
    const config: ActionSheetConfig = {
      header: 'Your action sheet header',
      items: this.items,
    };
    this.modalController.showActionSheet(config, this.onItemSelect.bind(this));
  }
}
