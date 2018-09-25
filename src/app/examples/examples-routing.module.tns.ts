import { NgModule } from '@angular/core';
import { NativeScriptRouterModule } from 'nativescript-angular/router';

import { routes } from './examples.routes';
import { ExamplesModule } from './examples.module';

@NgModule({
  imports: [NativeScriptRouterModule.forChild(routes), ExamplesModule],
  exports: [NativeScriptRouterModule]
})
export class ExamplesRoutingModule { }
