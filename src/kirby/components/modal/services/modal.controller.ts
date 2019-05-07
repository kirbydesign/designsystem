import { Injectable, ViewContainerRef } from '@angular/core';

import { ModalWindowHelper } from './modal-window.helper';
import { ActionSheetHelper } from './action-sheet.helper';
import { ModalWindowConfig } from '../modal-window/config/modal-window-config';
import { IModalController } from './modal.controller.interface';
import { ActionSheetConfig } from '../action-sheet/config/action-sheet-config';

@Injectable()
export class ModalController implements IModalController {
  private modals: { close: (data?: any) => {} }[] = [];
  // registerModal needs to be wrapped, because it is a function with side-effects (we modify this.modals),
  // hence this.modals.push(modal) is going to throw an error once we invoke it from another class
  private registerModalWrapper: (modal: { close: (data?: any) => {} }) => void = (modal) => {
    this.registerWindow(modal);
  };

  constructor(
    private modalWindowHelper: ModalWindowHelper,
    private actionSheetHelper: ActionSheetHelper
  ) {}

  public showModalWindow(
    config: ModalWindowConfig,
    vcRef: ViewContainerRef,
    onCloseModal?: (data?: any) => void
  ): void {
    const modalCloseEvent: Promise<any> = this.modalWindowHelper.showModalWindow(
      config,
      vcRef,
      this.registerModalWrapper
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

  public showActionSheetWindow(
    config: ActionSheetConfig,
    vcRef: ViewContainerRef,
    onCloseModal?: (data?: any) => void
  ): void {
    this.actionSheetHelper
      .showActionSheet(config, vcRef, this.registerModalWrapper)
      .then((data) => {
        this.forgetTopModal();
        if (onCloseModal) {
          onCloseModal(data);
        }
      });
  }

  public registerWindow(modal: { close: (data?: any) => {} }): void {
    this.modals.push(modal);
  }

  public hideWindow(data?: any): void {
    const modal = this.modals[this.modals.length - 1];
    if (!modal) {
      throw new Error('No modal windows are currently registered');
    }
    modal.close(data);
  }

  private forgetTopModal(): void {
    this.modals.pop();
  }
}
