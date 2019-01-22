import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';

import { KirbyModule } from '../../kirby/kirby.module';
import { COMPONENT_DECLARATIONS } from './examples.common';
// tslint:disable-next-line:max-line-length
import { NativeScriptDoughnutChartExampleComponent } from './nativescript-only/doughnut-chart-example/doughnut-chart-example.component.tns-only';
// tslint:disable-next-line:max-line-length
import { NativeScriptLineChartExampleComponent } from './nativescript-only/line-chart-example/line-chart-example.component.tns-only';
// tslint:disable-next-line:max-line-length
const nativeScriptDeclarations = [...COMPONENT_DECLARATIONS, NativeScriptDoughnutChartExampleComponent, NativeScriptLineChartExampleComponent];

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
