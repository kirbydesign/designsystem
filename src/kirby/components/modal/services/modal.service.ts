import { Injectable, ViewContainerRef } from '@angular/core';

import { ModalServiceHelper } from './modal.service-helper';
import { ModalConfig } from '../config/modal-config';

@Injectable()
export class ModalService {
  constructor(private modalServiceHelper: ModalServiceHelper) {}

  public showModal(config: ModalConfig, vcRef: ViewContainerRef, callback?: Function): number {
    const uid = new Date().getTime();
    config.uid = uid;
    this.modalServiceHelper.showModal(config, vcRef, callback);
    return uid;
  }

  public hideModal(uid: number, data?: any): void {
    this.modalServiceHelper.hideModal(uid, data);
  }
}
