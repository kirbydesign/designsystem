import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { IconModule } from './components/icon/icon.module';
import { KirbyModule } from './kirby.module';
import { FullscreenModalExperimentalComponent } from './components/modal-experimental/fullscreen/fullscreen.component';
import { ModalFooterExperimentalComponent } from './components/modal-experimental/footer/footer.component';

const components = [FullscreenModalExperimentalComponent, ModalFooterExperimentalComponent];

const exports = [...components];
@NgModule({
  declarations: components,
  imports: [CommonModule, IonicModule, IconModule, KirbyModule],
  exports: exports,
})
export class KirbyModalModule {}
