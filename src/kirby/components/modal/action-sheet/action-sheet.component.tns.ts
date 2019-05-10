import { Component } from '@angular/core';
import { ContentView, ShownModallyData, View } from 'tns-core-modules/ui/content-view';
import { ModalDialogParams } from 'nativescript-angular';

import { IModalController } from '../services/modal.controller.interface';
import { ActionSheetConfig } from './config/action-sheet-config';
import { ActionSheetItem } from './config/action-sheet-item';

@Component({
  templateUrl: './action-sheet.component.html',
  styleUrls: ['./action-sheet.component.scss'],
})
export class ActionSheetComponent extends ContentView {
  config: ActionSheetConfig;
  view: View;

  constructor(private modalController: IModalController, private params: ModalDialogParams) {
    super();
    this.config = this.params.context;
    this.modalController.register({ close: this.params.closeCallback });
  }

  onShowingActionSheet(args: ShownModallyData): void {
    this.view = <View>args.object;
    this.animateModal();
  }

  onModalDismiss(): void {
    this.modalController.hideTopmost();
  }

  onItemSelect(selection: ActionSheetItem) {
    this.modalController.hideTopmost(selection);
  }

  // TODO: this function is currently the same as the modal-window.component.tns.ts one
  // extract it in a common class
  private animateModal(): void {
    if (this.view.android) {
      this.view
        .animate({
          translate: { x: 0, y: Number(this.view.height) },
          duration: 0,
        })
        .then(() => {
          this.view.animate({
            translate: { x: 0, y: 0 },
            duration: 300,
          });
        });
    }
  }
}
