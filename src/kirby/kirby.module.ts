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
import { LoadingOverlayComponent } from './services/loading-overlay/loading-overlay/loading-overlay.component';

@NgModule({
  imports: [CommonModule, RouterModule, OverlayModule, IonicModule.forRoot()],
  declarations: [
    InfiniteScrollDirective,
    KeyHandlerDirective,
    LoadingOverlayComponent,
    ...declarations,
  ],
  providers: [...providerDeclarations],
  entryComponents: [ModalWrapperComponent, ActionSheetComponent, LoadingOverlayComponent],
  exports: [InfiniteScrollDirective, ...declarations],
})
export class KirbyModule {}
