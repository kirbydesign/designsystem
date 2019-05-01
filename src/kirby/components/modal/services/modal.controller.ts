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
    onCloseModal?: (data?: any) => void
  ): void {
    // registerModal needs to be wrapped, because it is a function with side-effects (we modify this.modals),
    // hence this.modals.push(modal) is going to throw an error once we invoke it from another class
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
        // Since Ionic wraps the return value in an object, which contains data as a property, we need to return data.data
        // We don't expect this on native, hence we return just data
        onCloseModal(typeof data === 'object' && 'data' in data ? data.data : data);
      }
    });
  }

  public registerModal(modal: { close: (data?: any) => {} }): void {
    this.modals.push(modal);
  }

  public hideModal(data?: any): void {
    const modal = this.modals[this.modals.length - 1];
    if (!modal) {
      throw new Error('No modals are currently registered');
    }
    modal.close(data);
  }

  private forgetTopModal(): void {
    this.modals.pop();
  }
}
