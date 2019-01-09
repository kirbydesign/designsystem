import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { NativeScriptUIChartModule } from 'nativescript-ui-chart/angular';

import { declarations } from './kirby.common';
// tslint:disable-next-line:max-line-length
import { NativeScriptDoughnutChartComponent } from './components/nativescript-only/doughnut-chart/doughnut-chart.component.tns-only';
// tslint:disable-next-line:max-line-length
import { NativeScriptSplineChartComponent } from './components/nativescript-only/spline-chart/spline-chart.component.tns-only';

// tslint:disable-next-line:max-line-length
const nativeScriptDeclarations = [...declarations, NativeScriptDoughnutChartComponent, NativeScriptSplineChartComponent];

@NgModule({
  imports: [
    NativeScriptCommonModule,
    NativeScriptRouterModule,
    NativeScriptUIChartModule,
  ],
  declarations: nativeScriptDeclarations,
  exports: nativeScriptDeclarations,
  schemas: [NO_ERRORS_SCHEMA]
})
export class KirbyModule { }
