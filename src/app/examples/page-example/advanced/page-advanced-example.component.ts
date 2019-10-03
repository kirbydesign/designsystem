import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ActionSheetItem } from '@kirbydesign/designsystem/components/modal/action-sheet/config/action-sheet-item';
import { ToastConfig, ToastController } from '@kirbydesign/designsystem';
import { BasePageExampleComponent } from '../base-page-example.component';

const config = {
  template: `<kirby-page defaultBackHref="/">

  <!-- Custom Page Title -->
  <div *kirbyPageFloatingTitle style="display: inline-flex;">
    Custom
    <kirby-icon name="arrow-down"></kirby-icon>
  </div>
  
  <!-- Page Actions -->
  <kirby-page-actions *kirbyPageFloatingActions>
    <button kirby-button>
      <kirby-icon name="cog"></kirby-icon>
    </button>
    <button kirby-button>
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

  constructor(private toastController: ToastController, route: ActivatedRoute) {
    super(route);
  }

  onItemSelect(item: ActionSheetItem) {
    const config: ToastConfig = {
      message: `'${item.text}' was selected.`,
      messageType: 'success',
      durationInMs: 1500,
    };
    this.toastController.showToast(config);
  }
}
