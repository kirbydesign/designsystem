import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { NativeScriptRouterModule } from 'nativescript-angular/router';

import { declarations } from './kirby.common';
import { DummyCardComponent } from './components/grid/dummy-card/dummy-card.component';

@NgModule({
  imports: [NativeScriptCommonModule, NativeScriptRouterModule],
  declarations: declarations,
  exports: declarations,
  entryComponents: [DummyCardComponent], // Oh snap, Jakob must fix this - all dynamic loaded components must be added here
  schemas: [NO_ERRORS_SCHEMA]
})
export class KirbyModule { }
