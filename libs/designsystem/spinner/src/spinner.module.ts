import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SpinnerComponent } from './spinner.component';

@NgModule({
  imports: [CommonModule, SpinnerComponent],
  exports: [SpinnerComponent],
  providers: [],
})
export class SpinnerModule {}
