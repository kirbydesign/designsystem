import { Injectable, ViewContainerRef } from '@angular/core';

import { IModalController } from './modal.controller.interface';
import { ModalHelper } from './modal.helper';
import { AlertHelper } from './alert.helper';
import { ActionSheetHelper } from './action-sheet.helper';
import { ModalConfig } from '../modal-wrapper/config/modal-config';
import { ActionSheetConfig } from '../action-sheet/config/action-sheet-config';
import { AlertConfig } from '../alert/config/alert-config';

@Injectable()
export class ModalController implements IModalController {
  private modals: { close: (data?: any) => {} }[] = [];

  constructor(
    private modalHelper: ModalHelper,
    private actionSheetHelper: ActionSheetHelper,
    private alertHelper: AlertHelper
  ) {}

  public showModal(
    config: ModalConfig,
    vcRef: ViewContainerRef,
    onCloseModal?: (data?: any) => void
  ): void {
    const modalCloseEvent: Promise<any> = this.modalHelper.showModalWindow(
      config,
      vcRef,
      this.register.bind(this)
    );
    modalCloseEvent.then((data) => {
      this.forgetTopmost();
      if (onCloseModal) {
        // Since Ionic wraps the return value in an object, which contains data as a property, we need to return data.data
        // We don't expect this on native, hence we return just data
        onCloseModal(typeof data === 'object' && 'data' in data ? data.data : data);
      }
    });
  }

  public showActionSheet(
    config: ActionSheetConfig,
    vcRef: ViewContainerRef,
    onCloseModal?: (data?: any) => void
  ): void {
    this.actionSheetHelper.showActionSheet(config, vcRef, this.register.bind(this)).then((data) => {
      this.forgetTopmost();
      if (onCloseModal) {
        onCloseModal(typeof data === 'object' && 'data' in data ? data.data : data);
      }
    });
  }
  showAlert(config: AlertConfig, onCloseModal?: (result?: boolean) => void) {
    this.alertHelper.showAlert(config).then((result) => {
      if (onCloseModal) {
        onCloseModal(result);
      }
    });
  }

  public register(modal: { close: (data?: any) => {} }): void {
    this.modals.push(modal);
  }

  public hideTopmost(data?: any): void {
    const modal = this.modals[this.modals.length - 1];
    if (!modal) {
      throw new Error('No modal windows are currently registered');
    }
    modal.close(data);
  }

  private forgetTopmost(): void {
    this.modals.pop();
  }

  public hideAll(): void {
    this.modals.forEach((modal) => modal.close());
  }
}
