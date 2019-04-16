import { ViewContainerRef } from '@angular/core';

import { ModalConfig } from '../config/modal-config';

export abstract class IModalController {
  abstract showModal(config: ModalConfig, vcRef: ViewContainerRef, callback?: Function): void;
  abstract hideModal(data?: any): void;
  abstract registerModalCloseRef(closeModal: () => {}): void;
}
