import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { KirbyModule } from '@kirbydesign/designsystem';

import { CodeViewerComponent } from './code-viewer.component';

@NgModule({
  imports: [CommonModule, KirbyModule],
  declarations: [CodeViewerComponent],
  exports: [CodeViewerComponent],
})
export class CodeViewerModule {}
