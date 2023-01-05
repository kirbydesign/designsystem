import { ComponentFactoryResolver, Injectable, Injector } from '@angular/core';
import { LoadingController } from '@ionic/angular';

import { SpinnerComponent } from '../spinner/spinner.component';

@Injectable({
  providedIn: 'root',
})
export class LoadingOverlayService {
  private ionLoading: HTMLIonLoadingElement = null;

  constructor(
    private loadingController: LoadingController,
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector
  ) {}

  public async showLoadingOverlay(showBackdrop: boolean = true): Promise<void> {
    if (!this.ionLoading) {
      this.ionLoading = await this.loadingController.create({
        cssClass: 'kirby-loading-overlay',
        duration: 0,
        message: null,
        showBackdrop: showBackdrop,
        spinner: null,
      });

      const loadingWrapper = this.ionLoading.querySelector('.loading-wrapper');
      const kirbySpinner = document.createElement('kirby-spinner');
      const factory = this.componentFactoryResolver.resolveComponentFactory(SpinnerComponent);
      factory.create(this.injector, [], kirbySpinner);
      loadingWrapper.appendChild(kirbySpinner);

      await this.ionLoading.present();
    }
  }

  public async hideLoadingOverlay(): Promise<void> {
    if (this.ionLoading) {
      await this.ionLoading.dismiss();
      this.ionLoading = null;
    }
  }
}
