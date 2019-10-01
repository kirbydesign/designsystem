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
import { FormFieldMessageComponent } from './components/form-field/form-field-message/form-field-message.component';
import { TabsModule } from '@kirbydesign/designsystem/components/tabs/tabs.module';

@NgModule({
  imports: [CommonModule, RouterModule, IonicModule.forRoot(), TabsModule],
  declarations: [
    InfiniteScrollDirective,
    ListItemColorDirective,
    KeyHandlerDirective,
    FormFieldMessageComponent,
    ...declarations,
  ],
  providers: [...providerDeclarations],
  entryComponents: [ModalWrapperComponent, ActionSheetComponent],
  exports: [InfiniteScrollDirective, ...declarations, TabsModule],
})
export class KirbyModule {}
