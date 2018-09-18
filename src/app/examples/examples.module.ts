import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {KirbyModule} from '~/kirby/kirby.module';
import {declarations} from './examples.common';

@NgModule({
  imports: [
    CommonModule,
    KirbyModule
  ],
  declarations: declarations,
  exports: declarations
})
export class ExamplesModule { }
