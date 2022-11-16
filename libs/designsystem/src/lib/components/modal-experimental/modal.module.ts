import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullscreenModalExperimentalComponent } from './fullscreen/fullscreen.component';

@NgModule({
  declarations: [FullscreenModalExperimentalComponent],
  imports: [CommonModule],
  exports: [FullscreenModalExperimentalComponent],
})
export class ModalModule {}
