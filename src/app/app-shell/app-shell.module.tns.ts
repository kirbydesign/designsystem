import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';

import { COMPONENT_DECLARATIONS } from './app-shell.common';

@NgModule({
  imports: [
    NativeScriptCommonModule
  ],
  declarations: [COMPONENT_DECLARATIONS],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppShellModule { }
