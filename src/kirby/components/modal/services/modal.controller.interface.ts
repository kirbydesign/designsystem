import { ViewContainerRef } from '@angular/core';

import { ModalConfig } from '../config/modal-config';

export abstract class IModalController {
  abstract showModal(
    config: ModalConfig,
    vcRef: ViewContainerRef,
    onCloseModal?: (data?: any) => any
  ): void;
  abstract hideModal(data?: any): void;
  abstract registerModal(modal: { close: (data?: any) => {} }): void;
}
