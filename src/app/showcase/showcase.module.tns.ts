import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';

import { COMPONENT_IMPORTS, COMPONENT_EXPORTS, COMPONENT_DECLARATIONS } from './showcase.common';

@NgModule({
  imports: [...COMPONENT_IMPORTS, NativeScriptCommonModule],
  declarations: COMPONENT_DECLARATIONS,
  exports: COMPONENT_EXPORTS,
  schemas: [NO_ERRORS_SCHEMA],
})
export class ShowcaseModule {}
