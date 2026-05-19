import { ChangeDetectorRef } from '@angular/core';

export abstract class SharedLoadingOverlayBase {
  constructor(protected cdr: ChangeDetectorRef) {}

  public isLoading = false;
  public showBackdrop = false;
  public hideContent = false;

  public showWrapperLoadingOverlay(showBackdrop: boolean, hideContent?: boolean) {
    this.showBackdrop = showBackdrop;
    this.hideContent = hideContent ?? false;
    this.isLoading = true;
    setTimeout(() => {
      this.hideLoadingOverlay();
    }, 3000);
  }

  public hideLoadingOverlay() {
    this.isLoading = false;
    this.showBackdrop = false;
    this.hideContent = false;
    this.cdr.detectChanges();
  }
}
