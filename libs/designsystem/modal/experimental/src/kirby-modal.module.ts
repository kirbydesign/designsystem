import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { IconModule } from '@kirbydesign/designsystem/icon';
import { ButtonComponent } from '@kirbydesign/designsystem/button';
import { FullscreenModalExperimentalComponent } from './fullscreen/fullscreen.component';
import { ModalFooterExperimentalComponent } from './footer/footer.component';
import { ModalWrapperExperimentalComponent } from './wrapper/wrapper.component';
import { ModalExperimentalController } from './services/modal.controller';
const COMPONENT_DECLARATIONS = [
  FullscreenModalExperimentalComponent,
  ModalFooterExperimentalComponent,
  ModalWrapperExperimentalComponent,
];
@NgModule({
  declarations: COMPONENT_DECLARATIONS,
  imports: [CommonModule, IonicModule, IconModule, ButtonComponent],
  exports: COMPONENT_DECLARATIONS,
  providers: [ModalExperimentalController],
})
export class KirbyModalModule {}
