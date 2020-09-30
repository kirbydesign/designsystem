import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToggleButtonComponent } from './toggle-button.component';
import { ToggleButtonThemeColorDirective } from './directives/toggle-button-color.directive';

const DECLARATIONS = [ToggleButtonComponent, ToggleButtonThemeColorDirective];

@NgModule({
  declarations: [...DECLARATIONS],
  imports: [CommonModule],
  exports: [...DECLARATIONS],
})
export class ToggleButtonModule {}
