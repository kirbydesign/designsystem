import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RadioGroupComponent } from './radio-group/radio-group.component';
import { RadioComponent } from './radio.component';

const declarations = [RadioComponent, RadioGroupComponent];

@NgModule({
  imports: [CommonModule],
  declarations: [...declarations],
  exports: [...declarations],
})
export class RadioModule {}
