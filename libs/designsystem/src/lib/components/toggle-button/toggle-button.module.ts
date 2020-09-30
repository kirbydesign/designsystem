import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToggleButtonComponent } from './toggle-button.component';
import { ToggleButtonColorDirective } from './directives/toggle-button-color.directive';

const DECLARATIONS = [ToggleButtonComponent, ToggleButtonColorDirective];

@NgModule({
  declarations: [...DECLARATIONS],
  imports: [CommonModule],
  exports: [...DECLARATIONS],
})
export class ToggleButtonModule {}
