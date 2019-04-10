import { ViewContainerRef } from '@angular/core';

import { ModalConfig } from '../config/modal-config';

export interface ModalServiceInterface {
  showModal(config: ModalConfig, vcRef: ViewContainerRef): Promise<void>;
  hideModal(uid: number, callback: Function): Promise<void>;
}
