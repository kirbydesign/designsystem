import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { declarations } from './kirby.common';
import { InfiniteScrollDirective } from './components/list/directives/infinite-scroll.directive';
import { ModalComponent } from './components/modal/modal.component';
import { ModalServiceHelper } from './components/modal/services/modal-service-helper';

@NgModule({
  imports: [CommonModule, RouterModule, IonicModule.forRoot()],
  declarations: [InfiniteScrollDirective, ...declarations],
  providers: [ModalServiceHelper],
  entryComponents: [ModalComponent],
  exports: [InfiniteScrollDirective, ...declarations],
})
export class KirbyModule {}
