import { ViewContainerRef } from '@angular/core';

import { ModalWindowConfig } from '../modal-window/config/modal-window-config';
import { ActionSheetConfig } from '../action-sheet/config/action-sheet-config';

export abstract class IModalController {
  abstract showModalWindow(
    config: ModalWindowConfig,
    vcRef: ViewContainerRef,
    onCloseModal?: (data?: any) => any
  ): void;
  abstract showActionSheetWindow(
    config: ActionSheetConfig,
    vcRef: ViewContainerRef,
    onCloseModal?: (data?: any) => any
  ): void;
  abstract hideWindow(data?: any): void;
  abstract registerWindow(modal: { close: (data?: any) => {} }): void;
}
