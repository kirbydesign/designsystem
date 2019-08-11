import { Component } from '@angular/core';

import { AlertConfig, ModalController } from '@kirbydesign/designsystem/modal';

@Component({
  selector: 'kirby-loading-overlay-example',
  templateUrl: './loading-overlay-example.component.html',
  styleUrls: ['./loading-overlay-example.component.scss'],
})
export class LoadingOverlayExampleComponent {
  public isLoading = false;
  public showBackdrop = false;

  constructor(private modalController: ModalController) {}

  public showLoadingOverlay(showBackdrop: boolean) {
    this.showBackdrop = showBackdrop;
    this.isLoading = true;

    setTimeout(() => {
      this.isLoading = false;
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
