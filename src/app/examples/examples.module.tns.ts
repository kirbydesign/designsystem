import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';

import { KirbyModule } from '../../kirby/kirby.module';
import { COMPONENT_DECLARATIONS } from './examples.common';
import { DoughnutChartNsExampleComponent } from './doughnut-chart-ns-example/doughnut-chart-ns-example.component.tns';

const nativeScriptDeclarations = [...COMPONENT_DECLARATIONS, DoughnutChartNsExampleComponent];

@NgModule({
  imports: [
    NativeScriptCommonModule,
    KirbyModule
  ],
  declarations: nativeScriptDeclarations,
  exports: nativeScriptDeclarations,
  schemas: [NO_ERRORS_SCHEMA]
})
export class ExamplesModule { }
