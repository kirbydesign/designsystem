import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { from, Observable, Subject, switchMap, tap } from 'rxjs';
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

type ModalDismissObservables = {
  onWillDismiss: Observable<OverlayEventDetail>;
  onDidDismiss: Observable<OverlayEventDetail>;
};
@Injectable()
export class ModalExperimentalController {
  private isModalOpening = false;

  constructor(private ionicModalController: ModalController) {}

  public showModal(config: ModalConfig): ModalDismissObservables {
    if (this.isModalOpening) return;

    const $onWillDismiss = new Subject<OverlayEventDetail>();
    const onWillDismiss$ = $onWillDismiss.asObservable();

    const $onDidDismiss = new Subject<OverlayEventDetail>();
    const onDidDismiss$ = $onDidDismiss.asObservable();

    const modal$ = from(
      this.ionicModalController.create({
        component: config.component,
        componentProps: config.componentProps,
        cssClass: config.cssClass,
        canDismiss: config.canDismiss,
        backdropDismiss: config.backdropDismiss,
        showBackdrop: config.showBackdrop,
      })
    );

    this.isModalOpening = true;

    modal$
      .pipe(
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

  public closeModal(role?: string, data?: any): void {
    this.ionicModalController.dismiss(data, role);
  }
}
