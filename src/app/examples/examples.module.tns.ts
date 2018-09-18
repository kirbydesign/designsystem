import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';

import {KirbyModule} from '~/kirby/kirby.module';
import {declarations} from './examples.common';

@NgModule({
  imports: [
    NativeScriptCommonModule,
    KirbyModule
  ],
  declarations: declarations,
  schemas: [NO_ERRORS_SCHEMA]
})
export class ExamplesModule { }
