import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { declarations, providerDeclarations } from './kirby.common';
import { InfiniteScrollDirective } from './components/list/directives/infinite-scroll.directive';
import { ModalComponent } from './components/modal/modal.component';
import { ActionSheetComponent } from './components/action-sheet/action-sheet.component';

@NgModule({
  imports: [CommonModule, RouterModule, IonicModule.forRoot()],
  declarations: [InfiniteScrollDirective, ...declarations],
  providers: [...providerDeclarations],
  entryComponents: [ModalComponent, ActionSheetComponent],
  exports: [InfiniteScrollDirective, ...declarations],
})
export class KirbyModule {}
