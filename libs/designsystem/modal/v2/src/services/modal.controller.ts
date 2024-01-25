import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular/standalone';
import { from, map, Observable, switchMap, take, tap } from 'rxjs';
import type { OverlayEventDetail } from '@ionic/core/components';

export type ModalFlavor = 'modal' | 'drawer';
type SizeTemp = 'md';

export type ModalV2Config = {
  flavor?: ModalFlavor;
  component: any;
  componentProps?: { [key: string]: any };
  cssClass?: string | string[];
  canDismiss?: boolean | (() => Promise<boolean>);
  backdropDismiss?: boolean;
  showBackdrop?: boolean;
  breakpoints?: number[];
  initialBreakpoint?: number;
  size?: SizeTemp;
  height?: string;
};

type ModalDismissObservables = {
  onWillDismiss: Observable<OverlayEventDetail>;
  onDidDismiss: Observable<OverlayEventDetail>;
};
@Injectable()
export class ModalV2Controller {
  private isModalOpening = false;

  constructor(private ionicModalController: ModalController) {}

  public showModal(config: ModalV2Config): ModalDismissObservables {
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
        breakpoints: config.flavor === 'drawer' ? config.breakpoints : undefined,
        initialBreakpoint: config.flavor === 'drawer' ? config.initialBreakpoint : undefined,
        handle: false,
        cssClass: ['kirby-modal-v2', config.size ? config.size : 'md', ...customCssClasses],
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
