import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToggleButtonComponent } from './toggle-button.component';

@NgModule({
  imports: [CommonModule, ToggleButtonComponent],
  exports: [ToggleButtonComponent],
})
export class ToggleButtonModule {}
