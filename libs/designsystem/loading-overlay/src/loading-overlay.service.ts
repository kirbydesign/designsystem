import { ComponentFactoryResolver, Injectable, Injector } from '@angular/core';
import { LoadingController } from '@ionic/angular/standalone';
import { SpinnerComponent } from '@kirbydesign/designsystem/spinner';

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
