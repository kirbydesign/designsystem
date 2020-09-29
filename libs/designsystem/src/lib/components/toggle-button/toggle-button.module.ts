import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToggleButtonComponent } from './toggle-button.component';
import { ToggleButtonColorDirective } from './directives/toggle-button-color.directive';
import { ToggleButtonShowWhenDirective } from './directives/toggle-button-show-when.directive';

const DECLARATIONS = [
  ToggleButtonComponent,
  ToggleButtonColorDirective,
  ToggleButtonShowWhenDirective,
];

@NgModule({
  declarations: [...DECLARATIONS],
  imports: [CommonModule],
  exports: [...DECLARATIONS],
})
export class ToggleButtonModule {}
