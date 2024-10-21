import { Component } from '@angular/core';

import { ActionSheetConfig, ActionSheetItem } from '@kirbydesign/designsystem';
import { ToastConfig, ToastController } from '@kirbydesign/designsystem';
import { ModalController } from '@kirbydesign/designsystem';

import { BasePageExampleComponent } from '../base-page-example.component';

const config = {
  template: `<kirby-page defaultBackHref="/">

  <!-- Custom Page Title -->
  <div *kirbyPageTitle>
    <h1>
      <ng-container *ngTemplateOutlet="customTitle"></ng-container>
    </h1>
  </div>

  <!-- Custom Page Subtitle -->
  <div *kirbyPageSubtitle>
    Custom subtitle with a long long long long name
  </div>

  <ng-template kirbyPageToolbarTitle>
    <ng-container *ngTemplateOutlet="customTitle"></ng-container>
  </ng-template>

  <ng-template #customTitle>
    Custom Title with a very long name
  </ng-template>

  <ng-template #customSubtitle>
    Custom subtitle of custom title with a very long name
  </ng-template>

  <!-- Fixed Page Actions -->
  <kirby-page-actions *kirbyPageActions="{fixed: true}">
    <button kirby-button (click)="onMoreSelect()">
      <kirby-icon name="more"></kirby-icon>
    </button>
  </kirby-page-actions>

  <!-- Sticky Page Actions -->
  <kirby-page-actions *kirbyPageActions>
    <button kirby-button (click)="onCogSelect()">
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
    .replace(' [innerHTML]="content">', '>...');

  items: ActionSheetItem[] = [
    { id: '1', text: 'Option 1' },
    { id: '2', text: 'Option 2' },
    { id: '3', text: 'Option 3' },
  ];

  constructor(
    private toastController: ToastController,
    private modalController: ModalController
  ) {
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
