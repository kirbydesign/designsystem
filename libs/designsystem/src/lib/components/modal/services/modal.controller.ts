import { Inject, Injectable, OnDestroy, Optional } from '@angular/core';
import { ActivatedRoute, Routes, ROUTES } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';

import { KirbyAnimation } from '../../../animation/kirby-animation';
import { ActionSheetConfig } from '../action-sheet/config/action-sheet-config';
import { ModalConfig } from '../modal-wrapper/config/modal-config';
import { ActionSheetHelper } from './action-sheet.helper';
import { AlertConfig } from '../alert/config/alert-config';
import { AlertHelper } from './alert.helper';
import { ModalHelper } from './modal.helper';
import { ModalNavigationService } from './modal-navigation.service';
import { Overlay } from './modal.interfaces';

@Injectable()
export class ModalController implements OnDestroy {
  private overlays: Overlay[] = [];
  private readonly noOverlayRegisteredErrorMessage = 'No modal overlays are currently registered';
  private destroy$ = new Subject<void>();

  constructor(
    private modalHelper: ModalHelper,
    private actionSheetHelper: ActionSheetHelper,
    private alertHelper: AlertHelper,
    private modalNavigationService: ModalNavigationService,
    @Optional() @Inject(ROUTES) private routeConfig: Routes[]
  ) {}

  async initialize() {
    await this.onModalRouteActivated();
    await this.onModalRouteDeactivated(); // TODO: Do we want to close modal when routing out of modal route? Or should the code that navigates close the window??
  }

  private async onModalRouteActivated() {
    const navigateOnWillClose = () => {
      this.modalNavigationService.navigateOutOfModalOutlet();
    };
    const modalRouteActivated$ = await this.modalNavigationService.modalRouteActivatedFor(
      this.routeConfig
    );
    const siblingModalRouteActivated$ = modalRouteActivated$.pipe(
      filter((modalRouteActivation) => !modalRouteActivation.isNewModal),
      map((modalRouteActivation) => modalRouteActivation.route)
    );

    modalRouteActivated$
      .pipe(
        takeUntil(this.destroy$),
        filter(() => this.overlays.length === 0)
      )
      .subscribe(async (modalRouteActivation) => {
        if (modalRouteActivation.isNewModal) {
          await this.showModalRoute(
            modalRouteActivation.route,
            siblingModalRouteActivated$,
            navigateOnWillClose
          );
        }
      });
  }

  private async onModalRouteDeactivated() {
    const modalRouteDeactivated$ = await this.modalNavigationService.modalRouteDeactivatedFor(
      this.routeConfig
    );
    modalRouteDeactivated$
      .pipe(
        takeUntil(this.destroy$),
        filter(() => this.overlays.length > 0) // TODO: This also fires when closing overlay - should we check for isClosing??
      )
      .subscribe(async () => {
        await this.hideAll();
      });
  }

  public async showModal(config: ModalConfig, onClose?: (data?: any) => void): Promise<void> {
    if (config.hasOwnProperty('dim')) {
      console.warn('ModalConfig.dim is deprecated - please remove from your configuration.');
    }
    await this.showAndRegisterOverlay(() => this.modalHelper.showModalWindow(config), onClose);
  }

  public async navigateToModal(path: string | string[]): Promise<boolean> {
    return this.modalNavigationService.navigateToModal(path);
  }

  public async navigateWithinModal(relativePath: string): Promise<boolean> {
    return this.modalNavigationService.navigateWithinModal(relativePath);
  }

  private async showModalRoute(
    modalRoute: ActivatedRoute,
    siblingModalRouteActivated$: Observable<ActivatedRoute>,
    onWillClose: (data?: any) => void
  ): Promise<void> {
    const config: ModalConfig = {
      component: null,
      modalRoute: modalRoute,
      siblingModalRouteActivated$: siblingModalRouteActivated$,
      flavor: 'modal', // Todo: Should it be possible to specify flavor as data in RouteConfig?
    };
    await this.showAndRegisterOverlay(
      () => this.modalHelper.showModalWindow(config),
      null,
      onWillClose
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
    onCloseOverlay?: (data?: any) => void,
    onWillCloseOverlay?: (data?: any) => void
  ) {
    const overlay = await showOverlay();
    if (!overlay) return;

    this.overlays.push(overlay);

    if (typeof onWillCloseOverlay === 'function') {
      overlay.onWillDismiss.then((event) => onWillCloseOverlay(event.data));
    }

    overlay.onDidDismiss.then((event) => {
      this.overlays.pop();
      if (typeof onCloseOverlay === 'function') {
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

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
