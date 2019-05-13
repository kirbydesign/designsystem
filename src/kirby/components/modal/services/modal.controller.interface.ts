import { ViewContainerRef } from '@angular/core';

import { ModalWrapperConfig } from '../modal-wrapper/config/modal-wrapper-config';
import { ActionSheetConfig } from '../action-sheet/config/action-sheet-config';

export abstract class IModalController {
  abstract showModal(
    config: ModalWrapperConfig,
    vcRef: ViewContainerRef,
    onCloseModal?: (data?: any) => any
  ): void;
  abstract showActionSheet(
    config: ActionSheetConfig,
    vcRef: ViewContainerRef,
    onCloseModal?: (data?: any) => any
  ): void;
  abstract hideTopmost(data?: any): void;
  abstract register(modal: { close: (data?: any) => {} }): void;
}
