import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {declarations} from './kirby.common';

@NgModule({
  imports: [CommonModule],
  declarations: declarations,
  exports: declarations
})
export class KirbyModule { }
