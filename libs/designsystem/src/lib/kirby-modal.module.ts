import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { IconModule } from './components/icon/icon.module';
import { KirbyModule } from './kirby.module';
import { FullscreenModalExperimentalComponent } from './components/modal-experimental/fullscreen/fullscreen.component';
import { ModalFooterExperimentalComponent } from './components/modal-experimental/footer/footer.component';
import { ModalWrapperExperimentalComponent } from './components/modal-experimental/wrapper/wrapper.component';
import { ModalExperimentalController } from './components/modal-experimental/services/modal.controller';

const components = [
  FullscreenModalExperimentalComponent,
  ModalFooterExperimentalComponent,
  ModalWrapperExperimentalComponent,
];

const exports = [...components, ModalExperimentalController];
@NgModule({
  declarations: components,
  imports: [CommonModule, IonicModule, IconModule, KirbyModule],
  exports: exports,
})
export class KirbyModalModule {}
