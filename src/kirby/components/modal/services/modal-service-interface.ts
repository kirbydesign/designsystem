import { ViewContainerRef } from '@angular/core';

import { ModalConfig } from '../config/modal-config';

export interface ModalServiceInterface {
  showModal(config: ModalConfig, vcRef: ViewContainerRef, callback?: Function): Promise<void>;
  hideModal(uid: number, data?: any): Promise<void>;
}
