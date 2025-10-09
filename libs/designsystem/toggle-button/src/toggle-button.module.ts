import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToggleButtonComponent } from './toggle-button.component';

const DECLARATIONS = [ToggleButtonComponent];

@NgModule({
  imports: [CommonModule, ...DECLARATIONS],
  exports: [...DECLARATIONS],
})
export class ToggleButtonModule {}
