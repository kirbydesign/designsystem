import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { OverlayEventDetail } from '@ionic/core/components';

export type ModalFlavor = 'modal' | 'compact';

export type ModalConfig = {
  flavor?: ModalFlavor;
  component: any;
  componentProps?: { [key: string]: any };
  cssClass?: string | string[];
  canDismiss?: boolean | (() => Promise<boolean>);
  backdropDismiss?: boolean;
  showBackdrop?: boolean;
};

type ModalInstanceAndData = {
  modal: HTMLIonModalElement;
  data: Subject<OverlayEventDetail>;
};

@Injectable()
export class ModalExperimentalController {
  private ionModal: HTMLIonModalElement;
  private isModalOpening = false;

  constructor(private ionicModalController: ModalController) {}

  public async showModal(config: ModalConfig): Promise<ModalInstanceAndData> {
    if (this.isModalOpening) return;

    const modalDataObserver$ = new Subject<OverlayEventDetail>();

    this.isModalOpening = true;

    this.ionModal = await this.ionicModalController.create({
      component: config.component,
      componentProps: config.componentProps,
      cssClass: config.cssClass,
      canDismiss: config.canDismiss,
      backdropDismiss: config.backdropDismiss,
      showBackdrop: config.showBackdrop,
    });

    await this.ionModal.present();

    this.ionModal.onWillDismiss().then((data) => {
      modalDataObserver$.next(data);
      modalDataObserver$.complete();
    });

    this.isModalOpening = false;

    return {
      modal: this.ionModal,
      data: modalDataObserver$,
    };
  }

  public async closeModal(role?: string, data?: any) {
    return this.ionModal.dismiss(data, role);
  }
}
