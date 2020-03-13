import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IphoneComponent } from './iphone.component';

@NgModule({
  imports: [CommonModule],
  declarations: [IphoneComponent],
  exports: [IphoneComponent],
})
export class IphoneModule {}
