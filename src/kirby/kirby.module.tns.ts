import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { NativeScriptUIChartModule } from 'nativescript-ui-chart/angular';

import { declarations } from './kirby.common';
import { DoughnutChartNsComponent } from './components/doughnut-chart-ns/doughnut-chart-ns.component.tns-only';

const nativeScriptDeclarations = [...declarations, DoughnutChartNsComponent];

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
