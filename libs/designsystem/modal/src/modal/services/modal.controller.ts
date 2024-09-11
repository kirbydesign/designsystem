import { Inject, Injectable, OnDestroy, Optional } from '@angular/core';
import { ActivatedRoute, Params, Routes, ROUTES } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';

import { ModalRouteActivation, Overlay } from '../../modal.interfaces';
import { ActionSheetConfig } from '../action-sheet/config/action-sheet-config';
import { AlertConfig } from '../alert/config/alert-config';

import { ModalNavigationService } from '../../modal-navigation.service';
import { ModalConfig } from '../../modal-wrapper';
import { ActionSheetHelper } from './action-sheet.helper';
import { AlertHelper } from './alert.helper';
import { ModalHelper } from './modal.helper';

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

  async initialize(moduleRootRoutePath?: string) {
    const modalNavigation = await this.modalNavigationService.getModalNavigation(
      this.routeConfig,
      moduleRootRoutePath
    );
    this.onModalRouteActivated(modalNavigation.activated$);
    this.onModalRouteDeactivated(modalNavigation.deactivated$);
  }

  private onModalRouteActivated(modalRouteActivated$: Observable<ModalRouteActivation>) {
    const navigateOnWillClose = () => {
      this.modalNavigationService.navigateOutOfModalOutlet();
    };

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

  private onModalRouteDeactivated(modalRouteDeactivated$: Observable<boolean>) {
    modalRouteDeactivated$
      .pipe(
        takeUntil(this.destroy$),
        filter(() => this.overlays.some((overlay) => overlay.isDismissing !== true))
      )
      .subscribe(async () => {
        await this.hideAll();
      });
  }

  public async showModal(config: ModalConfig, onClose?: (data?: any) => void): Promise<void> {
    await this.showAndRegisterOverlay(() => this.modalHelper.showModalWindow(config), onClose);
  }

  public async navigateToModal(path: string | string[], queryParams?: Params): Promise<boolean> {
    return this.modalNavigationService.navigateToModal(path, queryParams);
  }

  public async navigateWithinModal(relativePath: string, queryParams?: Params): Promise<boolean> {
    return this.modalNavigationService.navigateWithinModal(relativePath, queryParams);
  }

  private async showModalRoute(
    modalRoute: ActivatedRoute,
    siblingModalRouteActivated$: Observable<ActivatedRoute>,
    onWillClose: (data?: any) => void
  ): Promise<void> {
    const config: ModalConfig = {
      ...modalRoute.snapshot.data.modalConfig,
      component: null,
      modalRoute: modalRoute,
      siblingModalRouteActivated$: siblingModalRouteActivated$,
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

  public async hideTopmost(data?: any): Promise<boolean> {
    const overlay = this.overlays[this.overlays.length - 1];
    if (!overlay) {
      throw new Error(this.noOverlayRegisteredErrorMessage);
    }
    return overlay.dismiss(data);
  }

  public async hideAll(): Promise<void> {
    await Promise.all(
      this.overlays
        .filter((overlay) => overlay.isDismissing !== true)
        .map(async (overlay) => {
          await overlay.dismiss();
        })
    );
  }

  public getTopMost(): Overlay | null {
    return this.overlays[this.overlays.length - 1];
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
