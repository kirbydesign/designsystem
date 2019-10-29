import { Component } from '@angular/core';

import { ActionSheetItem, ActionSheetConfig } from '@kirbydesign/designsystem/modal';
import { ToastConfig, ToastController } from '@kirbydesign/designsystem';
import { ModalController } from '@kirbydesign/designsystem/modal';

import { BasePageExampleComponent } from '../base-page-example.component';

const config = {
  template: `<kirby-page defaultBackHref="/">

  <!-- Custom Page Title -->
  <h1 *kirbyPageTitle>
    <ng-container *ngTemplateOutlet="customTitle"></ng-container>
  </h1>

  <ng-template kirbyPageToolbarTitle>
    <ng-container *ngTemplateOutlet="customTitle"></ng-container>
  </ng-template>

  <ng-template #customTitle>
    <div class="custom-page-title">
      Custom
      <kirby-icon name="arrow-down"></kirby-icon>
    </div>
  </ng-template>
  
  <!-- Fixed Page Actions -->
  <kirby-page-actions *kirbyPageActions="{fixed: true}">
    <button *ngIf="true" kirby-button (click)="onMoreSelect()">
      <kirby-icon name="more"></kirby-icon>
    </button>
  </kirby-page-actions>

  <!-- Sticky Page Actions -->
  <kirby-page-actions *kirbyPageActions>
    <button *ngIf="true" kirby-button (click)="onCogSelect()">
      <kirby-icon name="cog"></kirby-icon>
    </button>
  </kirby-page-actions>

  <!-- Custom Content Template (without wrapper) -->
  <div *kirbyPageContent [innerHTML]="content"></div>
  
  <!-- Fixed Content -->
  <kirby-fab-sheet *kirbyPageContent="{fixed: true}" horizontalAlignment="right">
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
  styles: ['.custom-page-title { display: inline-flex; }'],
})
export class PageAdvancedExampleComponent extends BasePageExampleComponent {
  static readonly template = config.template
    .replace(' defaultBackHref="/"', '')
    .replace(' [innerHTML]="content">', '>...')
    .replace(' *ngIf="true"', '');

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
