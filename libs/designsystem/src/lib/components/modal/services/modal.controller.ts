import { Injectable } from '@angular/core';

import { ModalHelper } from './modal.helper';
import { AlertHelper } from './alert.helper';
import { ActionSheetHelper } from './action-sheet.helper';
import { ActionSheetConfig } from '../action-sheet/config/action-sheet-config';
import { AlertConfig } from '../alert/config/alert-config';
import { KirbyAnimation } from '../../../animation/kirby-animation';
import { ModalConfig } from '../modal-wrapper/config/modal-config';
import { Overlay } from './modal.interfaces';

@Injectable()
export class ModalController {
  private overlays: Overlay[] = [];
  private readonly noOverlayRegisteredErrorMessage = 'No modal overlays are currently registered';

  constructor(
    private modalHelper: ModalHelper,
    private actionSheetHelper: ActionSheetHelper,
    private alertHelper: AlertHelper
  ) {}

  public async showModal(config: ModalConfig, onClose?: (data?: any) => void): Promise<void> {
    if (config.hasOwnProperty('dim')) {
      console.warn('ModalConfig.dim is deprecated - please remove from your configuration.');
    }
    await this.showAndRegisterOverlay(() => this.modalHelper.showModalWindow(config), onClose);
  }

  public async showActionSheet(
    config: ActionSheetConfig,
    onClose?: (data?: any) => void
  ): Promise<void> {
    await this.showAndRegisterOverlay(
      () => this.actionSheetHelper.showActionSheet(config),
      onClose
    );
  }

  public async showAlert(config: AlertConfig, onClose?: (result: boolean) => void): Promise<void> {
    await this.showAndRegisterOverlay(() => this.alertHelper.showAlert(config), onClose);
  }

  private async showAndRegisterOverlay(
    showOverlay: () => Promise<Overlay>,
    onCloseOverlay?: (data?: any) => void
  ) {
    const overlay = await showOverlay();
    this.overlays.push(overlay);
    overlay.onDidDismiss.then((data) => {
      this.forgetTopmost();
      if (onCloseOverlay) {
        // Since Ionic wraps the return value in an object, which contains data as a property, we need to return data.data
        onCloseOverlay(typeof data === 'object' && 'data' in data ? data.data : data);
      }
    });
  }

  public registerPresentingElement(element: HTMLElement) {
    this.modalHelper.registerPresentingElement(element);
  }

  public async hideTopmost(data?: any): Promise<boolean> {
    const overlay = this.overlays[this.overlays.length - 1];
    if (!overlay) {
      throw new Error(this.noOverlayRegisteredErrorMessage);
    }
    return overlay.dismiss(data);
  }

  /**
   * @deprecated Will be removed in next major version. Inject Modal and use Modal.scrollToTop instead.
   */
  public scrollToTop(duration?: KirbyAnimation.Duration) {
    const overlay = this.overlays[this.overlays.length - 1];
    if (!overlay) {
      throw new Error(this.noOverlayRegisteredErrorMessage);
    }
    this.modalHelper.scrollToTop(this.noOverlayRegisteredErrorMessage, duration);
  }

  /**
   * @deprecated Will be removed in next major version. Inject Modal and use Modal.scrollToBottom instead.
   */
  public scrollToBottom(duration?: KirbyAnimation.Duration) {
    const overlay = this.overlays[this.overlays.length - 1];
    if (!overlay) {
      throw new Error(this.noOverlayRegisteredErrorMessage);
    }
    this.modalHelper.scrollToBottom(this.noOverlayRegisteredErrorMessage, duration);
  }

  private forgetTopmost(): void {
    this.overlays.pop();
  }

  public async hideAll(): Promise<void> {
    await Promise.all(
      this.overlays.map(async (overlay) => {
        await overlay.dismiss();
      })
    );
  }
}
