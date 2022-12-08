import { Inject, Injectable, OnDestroy, Optional } from '@angular/core';
import { ActivatedRoute, Params, ROUTES, Routes } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { OverlayEventDetail } from '@ionic/core/components';
import { ModalRouteActivation } from '../../modal/services/modal.interfaces';
import { ModalExperimentalNavigationService } from './modal-navigation.service';

export type ModalFlavor = 'modal' | 'compact';

export type ModalConfig = {
  flavor?: ModalFlavor;
  component: any;
  componentProps?: { [key: string]: any };
  cssClass?: string | string[];
  canDismiss?: boolean | (() => Promise<boolean>);
};

type ModalInstanceAndData = {
  modal: HTMLIonModalElement;
  data: Subject<OverlayEventDetail>;
};

@Injectable()
export class ModalExperimentalController implements OnDestroy {
  private ionModal: HTMLIonModalElement;
  private isModalOpening = false;
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

  public async showModal(config: ModalConfig): Promise<ModalInstanceAndData> {
    if (this.isModalOpening) return;

    const modalDataObserver$ = new Subject<OverlayEventDetail>();

    this.isModalOpening = true;

    this.ionModal = await this.ionicModalController.create({
      component: config.component,
      componentProps: config.componentProps,
      cssClass: config.cssClass,
      canDismiss: config.canDismiss,
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

  public async closeModal(role: string, data?: any) {
    return this.ionModal.dismiss(data, role);
  }

  private async onModalRouteActivated(modalRouteActivated$: Observable<ModalRouteActivation>) {
    modalRouteActivated$.pipe(takeUntil(this.destroy$)).subscribe(async (modalRouteActivation) => {
      if (modalRouteActivation.isNewModal) {
        const modal = await this.showModalRoute(modalRouteActivation.route);
        await modal.onWillDismiss();
        this.modalNavigationService.navigateOutOfModalOutlet();
      }
    });
  }

  private onModalRouteDeactivated(modalRouteDeactivated$: Observable<boolean>) {
    modalRouteDeactivated$.pipe(takeUntil(this.destroy$)).subscribe(async () => {
      this.modalNavigationService.navigateOutOfModalOutlet();

      if (this.ionModal) {
        this.ionModal.dismiss();
      }
    });
  }

  private async showModalRoute(modalRoute: ActivatedRoute): Promise<HTMLIonModalElement> {
    const config: ModalConfig = {
      component: modalRoute.component,
      flavor: 'modal',
    };

    const modal = await this.showModal(config);
    return modal.modal;
  }

  public async navigateToModal(path: string | string[], queryParams?: Params): Promise<boolean> {
    return this.modalNavigationService.navigateToModal(path, queryParams);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
