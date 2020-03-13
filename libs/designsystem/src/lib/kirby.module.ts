import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { OverlayModule } from '@angular/cdk/overlay';

import { declarations, providerDeclarations } from './kirby.common';
import { InfiniteScrollDirective } from './components/list/directives/infinite-scroll.directive';
import { ModalWrapperComponent } from './components/modal/modal-wrapper/modal-wrapper.component';
import { ModalCompactWrapperComponent } from './components/modal/modal-wrapper/compact/modal-compact-wrapper.component';
import { ActionSheetComponent } from './components/modal/action-sheet/action-sheet.component';
import { KeyHandlerDirective } from './directives/key-handler/key-handler.directive';
import { FullscreenLoadingOverlayComponent } from './components/loading-overlay/fullscreen-loading-overlay/fullscreen-loading-overlay.component';
import { LoadingOverlayComponent } from './components/loading-overlay/loading-overlay.component';
import { ListItemColorDirective } from './components/list/directives/list-item-color.directive';
import { AlertComponent } from './components/modal/alert/alert.component';
import { PageModule } from './components/page/page.module';
import { FormFieldMessageComponent } from './components/form-field/form-field-message/form-field-message.component';
import { RouterOutletModule } from './components/router-outlet/router-outlet.module';
import { TabsModule } from './components/tabs/tabs.module';
import { IconModule } from './components/icon/icon.module';
import { ItemModule } from './components/item/item.module';
import { AppModule } from './components/app/app.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    IonicModule.forRoot({
      mode: 'ios',
    }),
    AppModule,
    RouterOutletModule,
    PageModule,
    OverlayModule,
    TabsModule,
    IconModule,
    ItemModule,
  ],
  declarations: [
    InfiniteScrollDirective,
    ListItemColorDirective,
    FullscreenLoadingOverlayComponent,
    LoadingOverlayComponent,
    KeyHandlerDirective,
    FormFieldMessageComponent,
    AlertComponent,
    ...declarations,
  ],
  providers: [...providerDeclarations],
  entryComponents: [
    ModalWrapperComponent,
    ModalCompactWrapperComponent,
    ActionSheetComponent,
    FullscreenLoadingOverlayComponent,
    AlertComponent,
  ],
  exports: [
    InfiniteScrollDirective,
    LoadingOverlayComponent,
    AppModule,
    RouterOutletModule,
    PageModule,
    TabsModule,
    IconModule,
    ItemModule,
    ...declarations,
  ],
})
export class KirbyModule {}
