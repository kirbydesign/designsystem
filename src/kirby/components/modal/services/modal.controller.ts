import { Injectable } from '@angular/core';

import { IModalController } from './modal.controller.interface';
import { ModalHelper } from './modal.helper';
import { AlertHelper } from './alert.helper';
import { ActionSheetHelper } from './action-sheet.helper';
import { ModalConfig } from '../modal-wrapper/config/modal-config';
import { ActionSheetConfig } from '../action-sheet/config/action-sheet-config';
import { AlertConfig } from '../alert/config/alert-config';
import { KirbyAnimation } from '@kirbydesign/designsystem/animation/kirby-animation';

export const modalScrollNoop = () => {
  throw new Error('No modal windows are currently registered');
};

export type modal = { close: (data?: any) => {}; config: ModalConfig };

@Injectable()
export class ModalController implements IModalController {
  // These are set in the ModalWrapperComponent
  scrollToTop: (duration?: KirbyAnimation.Duration) => void = modalScrollNoop;
  scrollToBottom: (duration?: KirbyAnimation.Duration) => void = modalScrollNoop;
  private modals: modal[] = [];
  constructor(
    private modalHelper: ModalHelper,
    private actionSheetHelper: ActionSheetHelper,
    private alertHelper: AlertHelper
  ) {}

  public showModal(config: ModalConfig, onCloseModal?: (data?: any) => void): void {
    const modalCloseEvent: Promise<any> = this.modalHelper.showModalWindow(
      config,
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

  public showActionSheet(config: ActionSheetConfig, onCloseModal?: (data?: any) => void): void {
    this.actionSheetHelper.showActionSheet(config, this.register.bind(this)).then((data) => {
      this.forgetTopmost();
      if (onCloseModal) {
        onCloseModal(typeof data === 'object' && 'data' in data ? data.data : data);
      }
    });
  }

  public showAlert(config: AlertConfig, onCloseModal?: (result: boolean) => void): void {
    const modalCloseEvent: Promise<boolean> = this.alertHelper.showAlert(
      config,
      this.register.bind(this)
    );

    modalCloseEvent.then((selection: any) => {
      this.forgetTopmost();

      if (onCloseModal) {
        onCloseModal(
          typeof selection === 'object' && 'data' in selection ? selection.data : selection
        );
      }
    });
  }

  public blurNativeWrapper(nativeElement: HTMLElement) {
    this.modalHelper.blurNativeWrapper(nativeElement);
  }

  public register(modal: modal): void {
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

    if (this.modals.length === 0) {
      this.scrollToTop = modalScrollNoop;
      this.scrollToBottom = modalScrollNoop;
      return;
    }

    const newTopmostModal = this.modals[this.modals.length - 1];
    newTopmostModal.config.setModalScrollableCB();
  }

  public hideAll(): void {
    this.modals.forEach((modal) => modal.close());
  }
}
