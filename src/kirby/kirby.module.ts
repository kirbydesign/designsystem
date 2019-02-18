import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import {declarations} from './kirby.common';
import { ListHeaderComponent } from './components/list/list-header/list-header.component';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: declarations,
  exports: declarations,
  entryComponents: [
    ListHeaderComponent
  ]
})
export class KirbyModule { }
