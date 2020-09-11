import { Injectable } from '@angular/core';

import { ModalHelper } from './modal.helper';
import { AlertHelper } from './alert.helper';
import { ActionSheetHelper } from './action-sheet.helper';
import { ActionSheetConfig } from '../action-sheet/config/action-sheet-config';
import { AlertConfig } from '../alert/config/alert-config';
import { KirbyAnimation } from '../../../animation/kirby-animation';
import { ModalConfig } from '../modal-wrapper/config/modal-config';
import { Overlay } from './modal.interfaces';
import { ModalOutlet } from './modal-outlet.service';

@Injectable()
export class ModalController {
  private overlays: Overlay[] = [];
  private readonly noOverlayRegisteredErrorMessage = 'No modal overlays are currently registered';

  constructor(
    private modalHelper: ModalHelper,
    private actionSheetHelper: ActionSheetHelper,
    private alertHelper: AlertHelper,
    private modalOutlet: ModalOutlet
  ) {
    this.resolveModal();
  }

  private resolveModal() {
    this.modalOutlet.resolve$.subscribe(() => {
      if (this.overlays.length === 0) this.showModal({ title: '' });
    });
  }

  public async showModal(config: ModalConfig, onClose?: (data?: any) => void): Promise<void> {
    if (config.hasOwnProperty('dim')) {
      console.warn('ModalConfig.dim is deprecated - please remove from your configuration.');
    }

    const onCloseOveride = () => {
      this.modalOutlet.destroy();
      if (typeof onClose === 'function') onClose();
    };

    await this.showAndRegisterOverlay(
      () => this.modalHelper.showModalWindow(config),
      onCloseOveride
    );
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
    overlay.onDidDismiss.then((event) => {
      this.overlays.pop();
      if (onCloseOverlay) {
        onCloseOverlay(event.data);
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
   * @deprecated Will be removed in next major version. Inject Modal in embedded component and use Modal.scrollToTop instead.
   */
  public scrollToTop(duration?: KirbyAnimation.Duration) {
    console.warn(
      'ModalController.scrollToTop is deprecated - please inject Modal in embedded component and use Modal.scrollToTop instead.'
    );
    const overlay = this.overlays[this.overlays.length - 1];
    if (!overlay) {
      throw new Error(this.noOverlayRegisteredErrorMessage);
    }
    this.modalHelper.scrollToTop(this.noOverlayRegisteredErrorMessage, duration);
  }

  /**
   * @deprecated Will be removed in next major version. Inject Modal in embedded component and use Modal.scrollToBottom instead.
   */
  public scrollToBottom(duration?: KirbyAnimation.Duration) {
    console.warn(
      'ModalController.scrollToBottom is deprecated - please inject Modal in embedded component and use Modal.scrollToBottom instead.'
    );
    const overlay = this.overlays[this.overlays.length - 1];
    if (!overlay) {
      throw new Error(this.noOverlayRegisteredErrorMessage);
    }
    this.modalHelper.scrollToBottom(this.noOverlayRegisteredErrorMessage, duration);
  }

  public async hideAll(): Promise<void> {
    await Promise.all(
      this.overlays.map(async (overlay) => {
        await overlay.dismiss();
      })
    );
  }
}
