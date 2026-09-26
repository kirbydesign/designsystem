import { ApplicationRef, createComponent, EnvironmentInjector, Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { SpinnerComponent } from '@kirbydesign/designsystem/spinner';

@Injectable({
  providedIn: 'root',
})
export class LoadingOverlayService {
  private ionLoading: HTMLIonLoadingElement | null = null;

  constructor(
    private loadingController: LoadingController,
    private applicationRef: ApplicationRef,
    private environmentInjector: EnvironmentInjector
  ) {}

  public async showLoadingOverlay(
    showBackdrop: boolean = true,
    hideContent: boolean = false
  ): Promise<void> {
    if (!this.ionLoading) {
      const cssClasses = ['kirby-loading-overlay'];

      if (hideContent) {
        cssClasses.push('kirby-loading-hide-content');
      }

      this.ionLoading = await this.loadingController.create({
        cssClass: cssClasses,
        duration: 0,
        message: null,
        showBackdrop: showBackdrop || hideContent,
        spinner: null,
      });

      const loadingWrapper = this.ionLoading.querySelector('.loading-wrapper');
      const kirbySpinner = document.createElement('kirby-spinner');
      const componentRef = createComponent(SpinnerComponent, {
        environmentInjector: this.environmentInjector,
        hostElement: kirbySpinner,
      });
      this.applicationRef.attachView(componentRef.hostView);
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
