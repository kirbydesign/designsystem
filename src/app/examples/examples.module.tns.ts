import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';

import { KirbyModule } from '../../kirby/kirby.module';
import { COMPONENT_DECLARATIONS } from './examples.common';
// tslint:disable-next-line:max-line-length
import { NativeScriptDoughnutChartExampleComponent } from './nativescript-only/doughnut-chart-example/doughnut-chart-example.component.tns-only';
// tslint:disable-next-line:max-line-length
import { NativeScriptSplineChartExampleComponent } from './nativescript-only/spline-chart-example/spline-chart-example.component.tns-only';
// tslint:disable-next-line:max-line-length
const nativeScriptDeclarations = [...COMPONENT_DECLARATIONS, NativeScriptDoughnutChartExampleComponent, NativeScriptSplineChartExampleComponent];

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
