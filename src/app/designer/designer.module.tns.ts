import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';

import { ExamplesModule } from '../examples/examples.module';
import { DesignerRoutingModule } from './designer-routing.module';

import { CardDesignerComponent } from './card-designer/card-designer.component';

@NgModule({
  imports: [NativeScriptCommonModule, ExamplesModule, DesignerRoutingModule],
  declarations: [CardDesignerComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class DesignerModule {}
