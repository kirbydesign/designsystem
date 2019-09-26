import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { declarations, providerDeclarations } from './kirby.common';
import { InfiniteScrollDirective } from './components/list/directives/infinite-scroll.directive';
import { ModalWrapperComponent } from './components/modal/modal-wrapper/modal-wrapper.component';
import { ActionSheetComponent } from './components/modal/action-sheet/action-sheet.component';
import { KeyHandlerDirective } from '@kirbydesign/designsystem/directives/key-handler/key-handler.directive';
import { ListItemColorDirective } from './components/list/directives/list-item-color.directive';
import { PageModule } from '@kirbydesign/designsystem/components/page/page.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    IonicModule.forRoot({
      mode: 'ios',
    }),
    PageModule,
  ],
  declarations: [
    InfiniteScrollDirective,
    ListItemColorDirective,
    KeyHandlerDirective,
    ...declarations,
  ],
  providers: [...providerDeclarations],
  entryComponents: [ModalWrapperComponent, ActionSheetComponent],
  exports: [InfiniteScrollDirective, ...declarations, PageModule],
})
export class KirbyModule {}
