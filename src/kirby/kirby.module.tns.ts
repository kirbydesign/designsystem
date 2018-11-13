import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';

import { declarations } from './kirby.common';

@NgModule({
  imports: [NativeScriptCommonModule],
  declarations: declarations,
  exports: declarations,
  schemas: [NO_ERRORS_SCHEMA]
})
export class KirbyModule { }
