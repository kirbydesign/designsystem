import { Component, ElementRef, Output, EventEmitter, HostListener } from '@angular/core';

import { ActionSheetConfig } from './config/action-sheet-config';
import { IModalController } from '../services/modal.controller.interface';

@Component({
  templateUrl: './action-sheet.component.html',
  styleUrls: ['./action-sheet.component.scss'],
})
export class ActionSheetComponent {
  @Output() result = new EventEmitter<string>();
  config: ActionSheetConfig;
  // we need this to detect the first click
  isOpeningClick: boolean = true;
  constructor(private _eref: ElementRef, private modalController: IModalController) {}

  onItemSelect(selection: string) {
    this.modalController.hideWindow(selection);
  }

  onModalDismiss(e: any) {
    // Handle key press, due to:
    // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/button_role#Required_JavaScript_Features
    if (e && e.keyCode && e.keyCode !== 32 && e.keyCode !== 13) {
      return;
    }
    this.modalController.hideWindow();
  }
}
