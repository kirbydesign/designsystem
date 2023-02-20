import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { from, Observable, Subject, switchMap, tap } from 'rxjs';
import { OverlayEventDetail } from '@ionic/core/components';

export type ModalFlavor = 'modal';
type Size = 'xxs' | 'xs' | 'sm' | 'md' | 'lg';

export type ModalExperimentalConfig = {
  flavor?: ModalFlavor;
  component: any;
  componentProps?: { [key: string]: any };
  cssClass?: string | string[];
  canDismiss?: boolean | (() => Promise<boolean>);
  backdropDismiss?: boolean;
  showBackdrop?: boolean;
  size?: Size;
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

    const $onWillDismiss = new Subject<OverlayEventDetail>();
    const onWillDismiss$ = $onWillDismiss.asObservable();

    const $onDidDismiss = new Subject<OverlayEventDetail>();
    const onDidDismiss$ = $onDidDismiss.asObservable();

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
          config.size ? config.size : 'medium',
          ...customCssClasses,
        ],
      })
    );

    this.isModalOpening = true;

    modal$
      .pipe(
        tap((modal) => {
          if (config.height) {
            modal.style.setProperty('--height', config.height);
          }
        }),
        tap((modal) => from(modal.present())),
        switchMap((modal) => modal.onWillDismiss())
      )
      .subscribe((res) => {
        this.isModalOpening = false;

        $onWillDismiss.next(res);
        $onWillDismiss.complete();

        $onDidDismiss.next(res);
        $onDidDismiss.complete();
      });

    return {
      onWillDismiss: onWillDismiss$,
      onDidDismiss: onDidDismiss$,
    };
  }

  public closeModal(data?: unknown, role?: string): void {
    this.ionicModalController.dismiss(data, role);
  }
}
