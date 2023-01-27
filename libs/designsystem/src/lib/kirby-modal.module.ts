import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { IconModule } from '@kirbydesign/designsystem/icon';
import { KirbyModule } from './kirby.module';
import { FullscreenModalExperimentalComponent } from './components/modal-experimental/fullscreen/fullscreen.component';
import { ModalFooterExperimentalComponent } from './components/modal-experimental/footer/footer.component';
import { ModalWrapperExperimentalComponent } from './components/modal-experimental/wrapper/wrapper.component';
import { ModalExperimentalController } from './components/modal-experimental/services/modal.controller';

const COMPONENT_DECLARATIONS = [
  FullscreenModalExperimentalComponent,
  ModalFooterExperimentalComponent,
  ModalWrapperExperimentalComponent,
];
@NgModule({
  declarations: COMPONENT_DECLARATIONS,
  imports: [CommonModule, IonicModule, IconModule, KirbyModule],
  exports: COMPONENT_DECLARATIONS,
  providers: [ModalExperimentalController],
})
export class KirbyModalModule {}
