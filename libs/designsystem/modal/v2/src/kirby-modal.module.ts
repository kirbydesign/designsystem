import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { IconModule } from '@kirbydesign/designsystem/icon';
import { ButtonComponent } from '@kirbydesign/designsystem/button';
import { RouterModule } from '@angular/router';
import { ModalExperimentalComponent } from './modal/modal.component';
import { ModalFooterExperimentalComponent } from './footer/footer.component';
import { ModalWrapperExperimentalComponent } from './wrapper/wrapper.component';
import { ModalExperimentalController } from './services/modal.controller';
import { ModalRoutingExperimentalComponent } from './modal-routing/modal-routing.component';

const COMPONENT_DECLARATIONS = [
  ModalExperimentalComponent,
  ModalFooterExperimentalComponent,
  ModalWrapperExperimentalComponent,
  ModalRoutingExperimentalComponent,
];
@NgModule({
  declarations: COMPONENT_DECLARATIONS,
  imports: [CommonModule, IonicModule, IconModule, ButtonComponent, RouterModule],
  exports: COMPONENT_DECLARATIONS,
  providers: [ModalExperimentalController],
})
export class KirbyModalModule {}
