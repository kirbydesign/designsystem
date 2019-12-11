import { Component, OnInit } from '@angular/core';

import { ActionSheetItem, ActionSheetConfig } from '@kirbydesign/designsystem/modal';
import { ToastConfig, ToastController } from '@kirbydesign/designsystem';
import { ModalController } from '@kirbydesign/designsystem/modal';

import { BasePageExampleComponent } from '../base-page-example.component';

const config = {
  template: `<kirby-page defaultBackHref="/">

  <!-- Custom Page Title -->
  <ng-container *ngIf="showTitle">
    <h1 *kirbyPageTitle>
      <ng-container *ngTemplateOutlet="customTitle"></ng-container>
    </h1>
  </ng-container>  

  <ng-container *ngIf="showTitle">
    <ng-template kirbyPageToolbarTitle>
      <ng-container *ngTemplateOutlet="customTitle"></ng-container>
    </ng-template>
  </ng-container>

  <ng-template #customTitle>
    <div class="custom-page-title">
      Custom
      <kirby-icon name="arrow-down"></kirby-icon>
    </div>
  </ng-template>
  
  <!-- Fixed Page Actions -->
  <ng-container *ngIf="showActions">
    <kirby-page-actions *kirbyPageActions="{fixed: true}">
      <button *ngIf="true" kirby-button (click)="onMoreSelect()">
        <kirby-icon name="more"></kirby-icon>
      </button>
    </kirby-page-actions>
  </ng-container>

  <!-- Sticky Page Actions -->
  <ng-container *ngIf="showActions">
    <kirby-page-actions *kirbyPageActions>
      <button *ngIf="true" kirby-button (click)="onCogSelect()">
        <kirby-icon name="cog"></kirby-icon>
      </button>
    </kirby-page-actions>
  </ng-container>
  
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
export class PageAdvancedExampleComponent extends BasePageExampleComponent implements OnInit {
  static readonly template = config.template
    .replace(' defaultBackHref="/"', '')
    .replace(' [innerHTML]="content">', '>...')
    .replace(' *ngIf="true"', '');

  items: ActionSheetItem[] = [
    { id: '1', text: 'Option 1' },
    { id: '2', text: 'Option 2' },
    { id: '3', text: 'Option 3' },
  ];

  showActions: boolean;
  showTitle: boolean;

  constructor(private toastController: ToastController, private modalController: ModalController) {
    super();
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.showTitle = true;
      this.showActions = true;
    }, 500);
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
