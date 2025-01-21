import { Component } from '@angular/core';
import { LoadingOverlayService } from '@kirbydesign/designsystem';
import { ButtonComponent } from '@kirbydesign/designsystem/button';
import { CodeViewerComponent } from '../../../shared/code-viewer/code-viewer.component';
import { loadingOverlayServiceExample } from './loading-overlay-service-example';

@Component({
  selector: 'cookbook-loading-overlay-service-example',
  templateUrl: './loading-overlay-service-example.component.html',
  imports: [ButtonComponent, CodeViewerComponent],
})
export class LoadingOverlayServiceExampleComponent {
  constructor(private loadingOverlayService: LoadingOverlayService) {}

  loadingOverlayServiceExample = loadingOverlayServiceExample;

  public showFullscreenLoadingOverlay(showBackdrop: boolean, hideContent?: boolean) {
    this.loadingOverlayService.showLoadingOverlay(showBackdrop, hideContent);

    setTimeout(() => {
      this.loadingOverlayService.hideLoadingOverlay();
    }, 5000);
  }
}
