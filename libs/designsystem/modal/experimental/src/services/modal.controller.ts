import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { from, map, Observable, switchMap, take, tap } from 'rxjs';
import { OverlayEventDetail } from '@ionic/core/components';

export type ModalFlavor = 'modal';
type Size = 'xxs' | 'xs' | 'sm' | 'md' | 'lg';
type SizeTemp = 'md';

export type ModalExperimentalConfig = {
  flavor?: ModalFlavor;
  component: any;
  componentProps?: { [key: string]: any };
  cssClass?: string | string[];
  canDismiss?: boolean | (() => Promise<boolean>);
  backdropDismiss?: boolean;
  showBackdrop?: boolean;
  size?: SizeTemp;
  height?: string;
};

type ModalDismissObservables = {
  onWillDismiss: Observable<OverlayEventDetail>;
  onDidDismiss: Observable<OverlayEventDetail>;
};
@Injectable()
export class ModalExperimentalController {
  private isModalOpening = false;

  constructor(private ionicModalController: ModalController) {}

  public showModal(config: ModalExperimentalConfig): ModalDismissObservables {
    if (this.isModalOpening) return;

    let customCssClasses: string[] = [];
    if (config.cssClass) {
      customCssClasses = Array.isArray(config.cssClass) ? config.cssClass : [config.cssClass];
    }

    const modal$ = from(
      this.ionicModalController.create({
        component: config.component,
        componentProps: config.componentProps,
        canDismiss: config.canDismiss,
        backdropDismiss: config.backdropDismiss,
        showBackdrop: config.showBackdrop,
        cssClass: [
          'kirby-modal-experimental',
          config.size ? config.size : 'md',
          ...customCssClasses,
        ],
      })
    );

    this.isModalOpening = true;

    const onWillDismiss$ = modal$.pipe(
      map((modal) => {
        if (config.height) {
          modal.style.setProperty('--height', config.height);
        }
        return modal;
      }),
      tap((modal) => from(modal.present())),
      switchMap((modal) => modal.onWillDismiss()),
      take(1)
    );

    this.isModalOpening = false;

    return {
      onWillDismiss: onWillDismiss$,
      onDidDismiss: onWillDismiss$,
    };
  }

  public closeModal(data?: unknown, role?: string): void {
    this.ionicModalController.dismiss(data, role);
  }
}
