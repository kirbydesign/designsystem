import { Injectable, ViewContainerRef } from '@angular/core';
import { ModalDialogService } from 'nativescript-angular/directives/dialogs';
import { ExtendedShowModalOptions } from 'nativescript-windowed-modal/windowed-modal.common';

import { ActionSheetConfig } from '../action-sheet/config/action-sheet-config';
import { ActionSheetComponent } from '../action-sheet/action-sheet.component';

@Injectable()
export class ActionSheetHelper {
  constructor(private modalDialogService: ModalDialogService) {}

  public async showActionSheet(
    config: ActionSheetConfig,
    vcRef: ViewContainerRef,
    _: any
  ): Promise<any> {
    return await this.modalDialogService.showModal(ActionSheetComponent, {
      viewContainerRef: vcRef,
      closeCallback: null,
      context: config,
      dimAmount: 0.5,
    } as ExtendedShowModalOptions);
  }
}
