import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KirbyModule } from '@kirbydesign/designsystem';
import { IphoneComponent } from './iphone.component';

@NgModule({
  imports: [CommonModule, KirbyModule],
  declarations: [IphoneComponent],
  exports: [IphoneComponent],
})
export class IphoneModule {}
