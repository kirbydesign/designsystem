import { Component } from '@angular/core';
import { NavParams } from '@ionic/angular';

import { ActionSheetConfig } from './config/action-sheet-config';
import { IModalController } from '../services/modal.controller.interface';

@Component({
  templateUrl: './action-sheet.component.html',
  styleUrls: ['./action-sheet.component.scss'],
})
export class ActionSheetComponent {
  config: ActionSheetConfig;

  constructor(private params: NavParams, private modalController: IModalController) {
    this.config = this.params.get('config');
  }

  onItemSelect(selection: string) {
    this.modalController.closeTopmost(selection);
  }

  onModalDismiss(e: any) {
    // Handle key press, due to:
    // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/button_role#Required_JavaScript_Features
    if (e && e.keyCode && e.keyCode !== 32 && e.keyCode !== 13) {
      return;
    }
    this.modalController.closeTopmost();
  }
}
