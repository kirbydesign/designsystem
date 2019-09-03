import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';

import { FullscreenLoadingOverlayComponent } from './fullscreen-loading-overlay/fullscreen-loading-overlay.component';
import { LoadingOverlayComponent } from './loading-overlay.component';
import { SpinnerComponent } from '../spinner/spinner.component';

@NgModule({
  declarations: [FullscreenLoadingOverlayComponent, LoadingOverlayComponent, SpinnerComponent],
  imports: [CommonModule, OverlayModule],
  exports: [LoadingOverlayComponent],
  providers: [],
  entryComponents: [FullscreenLoadingOverlayComponent],
})
export class LoadingOverlayModule {}
