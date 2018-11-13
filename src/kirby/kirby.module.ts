import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartsModule } from 'ng2-charts';

import {declarations} from './kirby.common';

@NgModule({
  imports: [CommonModule, ChartsModule],
  declarations: declarations,
  exports: declarations
})
export class KirbyModule { }
