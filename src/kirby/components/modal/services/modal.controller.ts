import { Injectable, ViewContainerRef } from '@angular/core';

import { ModalHelper } from './modal.helper';
import { ModalConfig } from '../config/modal-config';
import { IModalController } from './modal.controller.interface';

@Injectable()
export class ModalController implements IModalController {
  private modalCloseRefs: Function[] = [];

  constructor(private modalHelper: ModalHelper) {}

  public showModal(config: ModalConfig, vcRef: ViewContainerRef, callback?: Function): void {
    let modal: Promise<any> = this.modalHelper.showModal(config, vcRef, this);
    modal.then((data) => {
      this.forgetTopModal();
      if (callback) {
        callback(data);
      }
    });
  }

  public registerModalCloseRef(closeModal: () => {}): void {
    this.modalCloseRefs.push(closeModal);
  }

  public hideModal(data?: any): void {
    let closeFunc = this.modalCloseRefs[this.modalCloseRefs.length - 1];
    if (!closeFunc) {
      throw new Error('No modals are currently registered');
    }
    closeFunc(data);
  }

  private forgetTopModal(): void {
    this.modalCloseRefs.pop();
  }
}
