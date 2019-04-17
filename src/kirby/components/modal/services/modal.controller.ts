import { Injectable, ViewContainerRef } from '@angular/core';

import { ModalHelper } from './modal.helper';
import { ModalConfig } from '../config/modal-config';
import { IModalController } from './modal.controller.interface';

@Injectable()
export class ModalController implements IModalController {
  private modals: { close: (data?: any) => {} }[] = [];

  constructor(private modalHelper: ModalHelper) {}

  public showModal(
    config: ModalConfig,
    vcRef: ViewContainerRef,
    onCloseModal?: (data?: any) => any
  ): void {
    const registerModalWrapper: (modal: { close: (data?: any) => {} }) => void = (modal) => {
      this.registerModal(modal);
    };

    const modalCloseEvent: Promise<any> = this.modalHelper.showModal(
      config,
      vcRef,
      registerModalWrapper
    );
    modalCloseEvent.then((data) => {
      this.forgetTopModal();
      if (onCloseModal) {
        onCloseModal(data);
      }
    });
  }

  public registerModal(modal: { close: (data?: any) => {} }): void {
    this.modals.push(modal);
  }

  public hideModal(data?: any): void {
    let modal = this.modals[this.modals.length - 1];
    if (!modal) {
      throw new Error('No modals are currently registered');
    }
    modal.close(data);
  }

  private forgetTopModal(): void {
    this.modals.pop();
  }
}
