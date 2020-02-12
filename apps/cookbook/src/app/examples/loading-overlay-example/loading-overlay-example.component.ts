import { Component } from '@angular/core';

import { AlertConfig, ModalController } from '@kirbydesign/designsystem/modal';
import { LoadingOverlayService } from '@kirbydesign/designsystem/components/loading-overlay/fullscreen-loading-overlay/loading-overlay.service';

@Component({
  selector: 'cookbook-loading-overlay-example',
  templateUrl: './loading-overlay-example.component.html',
  styleUrls: ['./loading-overlay-example.component.scss'],
})
export class LoadingOverlayExampleComponent {
  public isLoading = false;
  public showBackdrop = false;

  constructor(private loadingOverlayService: LoadingOverlayService) {}

  public showWrapperLoadingOverlay(showBackdrop: boolean) {
    this.showBackdrop = showBackdrop;
    this.isLoading = true;

    setTimeout(() => {
      this.isLoading = false;
    }, 5000);
  }

  public showFullscreenLoadingOverlay(showBackdrop: boolean) {
    this.loadingOverlayService.showLoadingOverlay(showBackdrop);

    setTimeout(() => {
      this.loadingOverlayService.hideLoadingOverlay();
    }, 5000);
  }
}
