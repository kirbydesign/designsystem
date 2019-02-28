import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import {declarations} from './kirby.common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  imports: [CommonModule, RouterModule, BrowserAnimationsModule],
  declarations: declarations,
  exports: declarations
})
export class KirbyModule { }
