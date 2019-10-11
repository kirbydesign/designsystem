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
import { ListItemColorDirective } from './components/list/directives/list-item-color.directive';
import { AlertComponent } from './components/modal/alert/alert.component';
import { PageModule } from '@kirbydesign/designsystem/components/page/page.module';
import { FormFieldMessageComponent } from './components/form-field/form-field-message/form-field-message.component';
import { AppModule } from '@kirbydesign/designsystem/components/app/app.module';
import { RouterOutletModule } from '@kirbydesign/designsystem/components/router-outlet/router-outlet.module';
import { TabsModule } from '@kirbydesign/designsystem/components/tabs/tabs.module';
import { IconModule } from '@kirbydesign/designsystem/components/icon/icon.module';

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
    ...declarations,
  ],
})
export class KirbyModule {}
