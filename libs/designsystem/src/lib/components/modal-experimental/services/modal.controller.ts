import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { from, map, Observable, Subject, switchMap, tap } from 'rxjs';
import { OverlayEventDetail } from '@ionic/core/components';
import { TestModalController } from './test-modal.controller';

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

type returnValues = {
  onWillDismiss: Observable<OverlayEventDetail<unknown>>;
  onDidDismiss: Observable<OverlayEventDetail<unknown>>;
};
@Injectable()
export class ModalExperimentalController {
  private ionModal: HTMLIonModalElement;
  private isModalOpening = false;
  private $onWillDismiss = new Subject<OverlayEventDetail>();
  private onWillDismiss$ = this.$onWillDismiss.asObservable();

  constructor(private ionicModalController: ModalController) {}

  public showModal(config: ModalConfig): ModalExperimentalController {
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

    modal$
      .pipe(
        tap((modal) => from(modal.present())),
        switchMap((modal) => modal.onWillDismiss())
      )
      .subscribe((res) => {
        this.$onWillDismiss.next(res);
        this.$onWillDismiss.complete();
      });

    return this;
  }

  public closeModal(role?: string, data?: any): void {
    this.ionicModalController.dismiss(data, role);
  }

  public onWillDismiss = (): Observable<OverlayEventDetail> => this.onWillDismiss$;
}
