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
import { AlertComponent } from './components/alert/alert.component';
import { FormFieldMessageComponent } from './components/form-field/form-field-message/form-field-message.component';

@NgModule({
  imports: [CommonModule, RouterModule, IonicModule.forRoot()],
  declarations: [
    InfiniteScrollDirective,
    ListItemColorDirective,
    KeyHandlerDirective,
    ...declarations,
    FormFieldMessageComponent,
    AlertComponent,
    ...declarations,
    AlertComponent,
  ],
  providers: [...providerDeclarations],
  entryComponents: [ModalWrapperComponent, ActionSheetComponent, AlertComponent],
  exports: [InfiniteScrollDirective, ...declarations],
})
export class KirbyModule {}
