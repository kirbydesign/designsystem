import { Component } from '@angular/core';

import { ActionSheetItem } from '@kirbydesign/designsystem';
import { ToastConfig, ToastController } from '@kirbydesign/designsystem';
import { ModalController } from '@kirbydesign/designsystem';

import { BasePageExampleComponent } from '../base-page-example.component';

const customTitleConfig = {
  template: `<kirby-page>
  <div *kirbyPageToolbarTitle>A Fixed Title</div>
  ...
</kirby-page>`,
};

const fixedActionsConfig = {
  template: `<kirby-page title="Normal Page Title">
  <kirby-page-actions *kirbyPageActions="{fixed: true}">
  ...
  </kirby-page-actions>
  ...
</kirby-page>`,
};

const config = {
  template: `<kirby-page toolbarTitle="A Fixed Title" defaultBackHref="/">
  <!-- Fixed Page Actions -->
  <kirby-page-actions *kirbyPageActions="{fixed: true}">
  <kirby-action-sheet 
  header="Your action sheet header" 
  subHeader="Your action sheet subheader"
  [items]="items"
  cancelButtonText="Custom cancel"
  itemSelect="onItemSelect($event)">
  </kirby-action-sheet>
   
  </kirby-page-actions>
  <!-- Page Content -->
  <kirby-page-content>
    <div [innerHTML]="content"></div>
  </kirby-page-content>
</kirby-page>`,
};
@Component({
  template: config.template,
})
export class PageFixedTitleAndActionsExampleComponent extends BasePageExampleComponent {
  static readonly template = config.template
    .replace(' defaultBackHref="/"', '')
    .replace('<div [innerHTML]="content"></div>', '...');
  static readonly customTitleTemplate = customTitleConfig.template;
  static readonly fixedActionsTemplate = fixedActionsConfig.template;

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
}
