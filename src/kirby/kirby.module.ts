import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { OverlayModule } from '@angular/cdk/overlay';

import { declarations, providerDeclarations } from './kirby.common';
import { InfiniteScrollDirective } from './components/list/directives/infinite-scroll.directive';
import { ModalWrapperComponent } from './components/modal/modal-wrapper/modal-wrapper.component';
import { ActionSheetComponent } from './components/modal/action-sheet/action-sheet.component';
import { KeyHandlerDirective } from '@kirbydesign/designsystem/directives/key-handler/key-handler.directive';
import { FullscreenLoadingOverlayComponent } from './components/loading-overlay/fullscreen-loading-overlay/fullscreen-loading-overlay.component';
import { LoadingOverlayComponent } from './components/loading-overlay/loading-overlay.component';

@NgModule({
  imports: [CommonModule, RouterModule, OverlayModule, IonicModule.forRoot()],
  declarations: [
    InfiniteScrollDirective,
    FullscreenLoadingOverlayComponent,
    LoadingOverlayComponent,
    KeyHandlerDirective,
    ...declarations,
  ],
  providers: [...providerDeclarations],
  entryComponents: [ModalWrapperComponent, ActionSheetComponent, FullscreenLoadingOverlayComponent],
  exports: [InfiniteScrollDirective, LoadingOverlayComponent, ...declarations],
})
export class KirbyModule {}
