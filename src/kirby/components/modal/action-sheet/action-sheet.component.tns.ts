import { Component } from '@angular/core';
import { ContentView, ShownModallyData, View } from 'tns-core-modules/ui/content-view';
import { ModalDialogParams } from 'nativescript-angular';

import { IModalController } from '../services/modal.controller.interface';
import { ActionSheetConfig } from './config/action-sheet-config';
import { ActionSheetItem } from './config/action-sheet-item';
import { NativeScriptAnimationHelper } from '../nativescript-animations/animations.helper.tns-only';

@Component({
  templateUrl: './action-sheet.component.html',
  styleUrls: ['./action-sheet.component.scss'],
  providers: [NativeScriptAnimationHelper],
})
export class ActionSheetComponent extends ContentView {
  config: ActionSheetConfig;
  cancelButtonText: string;
  view: View;

  constructor(
    private modalController: IModalController,
    private params: ModalDialogParams,
    private animationHelper: NativeScriptAnimationHelper
  ) {
    super();
    this.config = this.params.context;
    this.cancelButtonText = this.config.cancelButtonText || 'Cancel';
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
      this.animationHelper.animateSlideUpOnAndroid(this.view);
    } else if (this.view.ios) {
      this.animationHelper.setTransitionStyleIOS(this.view, 2);
      const actionSheetContainer = <View>this.view.getViewById('action-sheet');
      this.animationHelper.animateSlideUpOnIOS(actionSheetContainer);
    }
  }
}
