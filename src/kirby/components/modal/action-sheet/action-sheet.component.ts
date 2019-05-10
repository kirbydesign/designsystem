import { Component } from '@angular/core';
import { NavParams } from '@ionic/angular';

import { ActionSheetConfig } from './config/action-sheet-config';
import { IModalController } from '../services/modal.controller.interface';
import { ActionSheetItem } from './config/action-sheet-item';

@Component({
  templateUrl: './action-sheet.component.html',
  styleUrls: ['./action-sheet.component.scss'],
})
export class ActionSheetComponent {
  config: ActionSheetConfig;

  constructor(private params: NavParams, private modalController: IModalController) {
    this.config = this.params.get('config');
  }

  onItemSelect(selection: ActionSheetItem) {
    this.modalController.hideTopmost(selection);
  }

  onModalDismiss() {
    this.modalController.hideTopmost();
  }
}
