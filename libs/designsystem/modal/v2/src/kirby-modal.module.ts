import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { IconModule } from '@kirbydesign/designsystem/icon';
import { ButtonComponent } from '@kirbydesign/designsystem/button';
import { RouterModule } from '@angular/router';
import { ModalV2Component } from './modal/modal.component';
import { ModalV2FooterComponent } from './footer/footer.component';
import { ModalV2WrapperComponent } from './wrapper/wrapper.component';
import { ModalV2Controller } from './services/modal.controller';
import { ModalV2RoutingComponent } from './modal-routing/modal-routing.component';

const COMPONENT_DECLARATIONS = [
  ModalV2Component,
  ModalV2FooterComponent,
  ModalV2WrapperComponent,
  ModalV2RoutingComponent,
];
@NgModule({
  declarations: COMPONENT_DECLARATIONS,
  imports: [CommonModule, IonicModule, IconModule, ButtonComponent, RouterModule],
  exports: COMPONENT_DECLARATIONS,
  providers: [ModalV2Controller],
})
export class KirbyModalModule {}
