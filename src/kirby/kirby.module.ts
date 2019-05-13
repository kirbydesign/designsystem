import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { declarations, providerDeclarations } from './kirby.common';
import { InfiniteScrollDirective } from './components/list/directives/infinite-scroll.directive';
import { ModalWrapperComponent } from './components/modal/modal-wrapper/modal-wrapper.component';
import { ActionSheetComponent } from './components/modal/action-sheet/action-sheet.component';

@NgModule({
  imports: [CommonModule, RouterModule, IonicModule.forRoot()],
  declarations: [InfiniteScrollDirective, ...declarations],
  providers: [...providerDeclarations],
  entryComponents: [ModalWrapperComponent, ActionSheetComponent],
  exports: [InfiniteScrollDirective, ...declarations],
})
export class KirbyModule {}
