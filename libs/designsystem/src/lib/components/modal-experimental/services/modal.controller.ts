import { Inject, Injectable, Optional } from '@angular/core';
import { ActivatedRoute, ROUTES, Routes } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Observable, Subject } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';
import { ModalRouteActivation } from '../../modal/services/modal.interfaces';
import { ModalExperimentalNavigationService } from './modal-navigation.service';

export type ModalFlavor = 'modal' | 'compact';

export type ModalConfig = {
  flavor?: ModalFlavor;
  component: any;
  componentProps?: { [key: string]: any };
};

@Injectable()
export class ModalExperimentalController {
  private ionModal: HTMLIonModalElement;
  private destroy$ = new Subject<void>();

  constructor(
    private ionicModalController: ModalController,
    private modalNavigationService: ModalExperimentalNavigationService,
    @Optional() @Inject(ROUTES) private routeConfig: Routes[]
  ) {
    this.initialize();
  }

  private async initialize() {
    const modalNavigation = await this.modalNavigationService.getModalNavigation(this.routeConfig);

    this.onModalRouteActivated(modalNavigation.activated$);
    this.onModalRouteDeactivated(modalNavigation.deactivated$);
  }

  public async showModal(config: ModalConfig): Promise<HTMLIonModalElement> {
    this.ionModal = await this.ionicModalController.create({
      component: config.component,
      componentProps: config.componentProps,
    });

    await this.ionModal.present();

    return this.ionModal;
  }

  public async closeModal(role: string, data?: any) {
    return this.ionModal.dismiss(data, role);
  }

  private onModalRouteActivated(modalRouteActivated$: Observable<ModalRouteActivation>) {
    // const navigateOnWillClose = () => {
    //   this.modalNavigationService.navigateOutOfModalOutlet();
    // };

    modalRouteActivated$.pipe(takeUntil(this.destroy$)).subscribe(async (modalRouteActivation) => {
      if (modalRouteActivation.isNewModal) {
        this.showModalRoute(modalRouteActivation.route);
      }
    });
  }

  private onModalRouteDeactivated(modalRouteDeactivated$: Observable<boolean>) {
    modalRouteDeactivated$.pipe(takeUntil(this.destroy$)).subscribe(async () => {
      this.ionModal.dismiss();
    });
  }

  private async showModalRoute(modalRoute: ActivatedRoute): Promise<HTMLIonModalElement> {
    const config: ModalConfig = {
      component: modalRoute.component,
      flavor: 'modal',
    };

    const modal = await this.showModal(config);
    return modal;
  }
}
