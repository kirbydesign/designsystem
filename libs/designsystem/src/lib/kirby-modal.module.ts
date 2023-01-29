import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { IconModule } from '@kirbydesign/designsystem/icon';
import { RouterModule } from '@angular/router';
import { KirbyModule } from './kirby.module';
import { FullscreenModalExperimentalComponent } from './components/modal-experimental/fullscreen/fullscreen.component';
import { ModalFooterExperimentalComponent } from './components/modal-experimental/footer/footer.component';
import { ModalWrapperExperimentalComponent } from './components/modal-experimental/wrapper/wrapper.component';
import { ModalExperimentalController } from './components/modal-experimental/services/modal.controller';
import { ModalRoutingExperimentalComponent } from './components/modal-experimental/modal-routing/modal-routing.component';

const COMPONENT_DECLARATIONS = [
  FullscreenModalExperimentalComponent,
  ModalFooterExperimentalComponent,
  ModalWrapperExperimentalComponent,
  ModalRoutingExperimentalComponent,
];
@NgModule({
  declarations: COMPONENT_DECLARATIONS,
  imports: [CommonModule, IonicModule, IconModule, KirbyModule, RouterModule],
  exports: COMPONENT_DECLARATIONS,
  providers: [ModalExperimentalController],
})
export class KirbyModalModule {}
