import { Injectable } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';

import { LoadingOverlay } from './loading-overlay.interface';
import { LoadingOverlayComponent } from './loading-overlay/loading-overlay.component';

@Injectable({
  providedIn: 'root',
})
export class LoadingOverlayService implements LoadingOverlay {
  private overlayRef: OverlayRef = null;

  constructor(private overlay: Overlay) {}

  showLoadingOverlay(showBackdrop: boolean = true): void {
    if (!this.overlayRef) {
      // Returns an OverlayRef (which is a PortalHost)
      this.overlayRef = this.overlay.create();
    }

    // Create ComponentPortal that can be attached to a PortalHost
    const spinnerOverlayPortal = new ComponentPortal(LoadingOverlayComponent);
    const component = this.overlayRef.attach(spinnerOverlayPortal); // Attach ComponentPortal to PortalHost
    component.instance.showBackdrop = showBackdrop;
  }
  hideLoadingOverlay(): void {
    if (!!this.overlayRef) {
      this.overlayRef.detach();
    }
  }
}
