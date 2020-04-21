import { Injectable } from '@angular/core';

import { ModalHelper } from './modal.helper';
import { AlertHelper } from './alert.helper';
import { ActionSheetHelper } from './action-sheet.helper';
import { ActionSheetConfig } from '../action-sheet/config/action-sheet-config';
import { AlertConfig } from '../alert/config/alert-config';
import { KirbyAnimation } from '../../../animation/kirby-animation';
import { ModalConfig } from '../modal-wrapper/config/modal-config';
import { IModal } from './modal.model';

@Injectable()
export class ModalController {
  private modals: IModal[] = [];
  private readonly noModalRegisteredErrorMessage = 'No modal windows are currently registered';

  constructor(
    private modalHelper: ModalHelper,
    private actionSheetHelper: ActionSheetHelper,
    private alertHelper: AlertHelper
  ) {}

  public async showModal(config: ModalConfig, onCloseModal?: (data?: any) => void): Promise<void> {
    if (config.hasOwnProperty('dim')) {
      console.warn('ModalConfig.dim is deprecated - please remove from your configuration.');
    }
    await this.showAndRegisterModal(() => this.modalHelper.showModalWindow(config), onCloseModal);
  }

  public async showActionSheet(
    config: ActionSheetConfig,
    onCloseModal?: (data?: any) => void
  ): Promise<void> {
    await this.showAndRegisterModal(
      () => this.actionSheetHelper.showActionSheet(config),
      onCloseModal
    );
  }

  public async showAlert(
    config: AlertConfig,
    onCloseModal?: (result: boolean) => void
  ): Promise<void> {
    await this.showAndRegisterModal(() => this.alertHelper.showAlert(config), onCloseModal);
  }

  private async showAndRegisterModal(
    showModal: () => Promise<IModal>,
    onCloseModal?: (data?: any) => void
  ) {
    const modal = await showModal();
    this.modals.push(modal);
    modal.onClose.then((data) => {
      this.forgetTopmost();
      if (onCloseModal) {
        // Since Ionic wraps the return value in an object, which contains data as a property, we need to return data.data
        // We don't expect this on native, hence we return just data
        onCloseModal(typeof data === 'object' && 'data' in data ? data.data : data);
      }
    });
  }

  public registerPresentingElement(element: HTMLElement) {
    this.modalHelper.registerPresentingElement(element);
  }

  public async hideTopmost(data?: any): Promise<boolean> {
    const modal = this.modals[this.modals.length - 1];
    if (!modal) {
      throw new Error(this.noModalRegisteredErrorMessage);
    }
    return modal.close(data);
  }

  /**
   * @deprecated Will be removed in next major version. Inject Modal and use Modal.scrollToTop instead.
   */
  public scrollToTop(duration?: KirbyAnimation.Duration) {
    const modal = this.modals[this.modals.length - 1];
    if (!modal) {
      throw new Error(this.noModalRegisteredErrorMessage);
    }
    this.modalHelper.scrollToTop(this.noModalRegisteredErrorMessage, duration);
  }

  /**
   * @deprecated Will be removed in next major version. Inject Modal and use Modal.scrollToBottom instead.
   */
  public scrollToBottom(duration?: KirbyAnimation.Duration) {
    const modal = this.modals[this.modals.length - 1];
    if (!modal) {
      throw new Error(this.noModalRegisteredErrorMessage);
    }
    this.modalHelper.scrollToBottom(this.noModalRegisteredErrorMessage, duration);
  }

  private forgetTopmost(): void {
    this.modals.pop();
  }

  public async hideAll(): Promise<void> {
    await Promise.all(
      this.modals.map(async (modal) => {
        await modal.close();
      })
    );
  }
}
