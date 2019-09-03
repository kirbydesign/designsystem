import { Component } from '@angular/core';

import { AlertConfig, ModalController } from '@kirbydesign/designsystem/modal';
import { LoadingOverlayService } from '@kirbydesign/designsystem/components/loading-overlay/fullscreen-loading-overlay/loading-overlay.service';

@Component({
  selector: 'kirby-loading-overlay-example',
  templateUrl: './loading-overlay-example.component.html',
  styleUrls: ['./loading-overlay-example.component.scss'],
})
export class LoadingOverlayExampleComponent {
  public isLoading = false;
  public showBackdrop = false;

  constructor(
    private modalController: ModalController,
    private loadingOverlayService: LoadingOverlayService
  ) {}

  public showWrapperLoadingOverlay(showBackdrop: boolean) {
    this.showBackdrop = showBackdrop;
    this.isLoading = true;

    setTimeout(() => {
      this.isLoading = false;
    }, 5000);
  }

  public showFullPageLoadingOverlay(showBackdrop: boolean) {
    this.loadingOverlayService.showLoadingOverlay(showBackdrop);

    setTimeout(() => {
      this.loadingOverlayService.hideLoadingOverlay();
    }, 5000);
  }

  public showAlert() {
    const config: AlertConfig = {
      title: 'Your alert',
      message: 'Your alert message',
      okBtnText: 'Ok',
      cancelBtnText: 'Cancel',
    };
    this.modalController.showAlert(config, this.onAlertClosed);
  }

  private onAlertClosed(selection: boolean) {
    console.log(`Alert selection: ${selection}`);
  }
}
