import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { IconModule } from './components/icon/icon.module';
import { KirbyModule } from './kirby.module';
import { FullscreenModalExperimentalComponent } from './components/modal-experimental/fullscreen/fullscreen.component';

@NgModule({
  declarations: [FullscreenModalExperimentalComponent],
  imports: [CommonModule, IonicModule, IconModule, KirbyModule],
  exports: [FullscreenModalExperimentalComponent],
})
export class KirbyModalModule {}
