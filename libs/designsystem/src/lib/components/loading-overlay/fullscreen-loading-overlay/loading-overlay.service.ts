import { Injectable } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';

import { FullscreenLoadingOverlayComponent } from './fullscreen-loading-overlay.component';

@Injectable({
  providedIn: 'root',
})
export class LoadingOverlayService {
  private overlayRef: OverlayRef = null;

  constructor(private overlay: Overlay) {}

  showLoadingOverlay(showBackdrop: boolean = true): void {
    if (!this.overlayRef) {
      this.overlayRef = this.overlay.create();
    }

    const spinnerOverlayPortal = new ComponentPortal(FullscreenLoadingOverlayComponent);
    if (!this.overlayRef.hasAttached()) {
      const component = this.overlayRef.attach(spinnerOverlayPortal);
      component.instance.showBackdrop = showBackdrop;
    }
  }

  hideLoadingOverlay(): void {
    if (!!this.overlayRef) {
      this.overlayRef.detach();
    }
  }
}
