import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { NativeScriptRouterModule } from 'nativescript-angular/router';

import {declarations} from './kirby.common';

@NgModule({
  imports: [NativeScriptCommonModule, NativeScriptRouterModule],
  declarations: declarations,
  exports: declarations,
  schemas: [NO_ERRORS_SCHEMA]
})
export class KirbyModule { }
