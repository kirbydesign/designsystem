import { Component } from '@angular/core';

import { ActionSheetConfig, ActionSheetItem } from '@kirbydesign/designsystem';
import { ToastConfig, ToastController } from '@kirbydesign/designsystem';
import { ModalController } from '@kirbydesign/designsystem';

import { BasePageExampleComponent } from '../base-page-example.component';

const config = {
  template: `<kirby-page defaultBackHref="/">

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
  

  <!-- Custom Page Title -->
  <div *kirbyPageTitle>
    <h1>Custom Title</h1>
  </div>
  <!-- Custom Page Subtitle -->
  <div *kirbyPageSubtitle>
    Custom subtitle
  </div>
  <ng-template kirbyPageToolbarTitle>
     Toolbar Title
  </ng-template>

  <!-- Custom Content Template (without wrapper) -->
  <div *kirbyPageContent [innerHTML]="content"></div>  
</kirby-page>`,
};
@Component({
  templateUrl: './page-advanced-example.component.html',
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
