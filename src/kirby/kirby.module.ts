import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import {declarations} from './kirby.common';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: declarations,
  exports: declarations
})
export class KirbyModule { }
