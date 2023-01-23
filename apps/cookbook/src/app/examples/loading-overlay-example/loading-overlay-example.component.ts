import { Component } from '@angular/core';

@Component({
  selector: 'cookbook-loading-overlay-example',
  templateUrl: './loading-overlay-example.component.html',
  styleUrls: ['./loading-overlay-example.component.scss'],
})
export class LoadingOverlayExampleComponent {
  public isLoading = false;
  public showBackdrop = false;
  public hideContent = false;

  public showWrapperLoadingOverlay(showBackdrop: boolean, hideContent?: boolean) {
    this.showBackdrop = showBackdrop;
    this.hideContent = hideContent;
    this.isLoading = true;

    setTimeout(() => {
      this.isLoading = false;
    }, 5000);
  }
}
