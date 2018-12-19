import { NgModule } from '@angular/core';
import { NativeScriptRouterModule } from 'nativescript-angular/router';

import { routes } from './examples.routes';
import { ExamplesModule } from './examples.module';
import { DoughnutChartNsExampleComponent } from './doughnut-chart-ns-example/doughnut-chart-ns-example.component.tns';

const nativeScriptRoutes = [...routes,
  {
    path: 'doughnut-chart-ns',
    component: DoughnutChartNsExampleComponent
  }
];

@NgModule({
  imports: [NativeScriptRouterModule.forChild(nativeScriptRoutes), ExamplesModule],
  exports: [NativeScriptRouterModule]
})
export class ExamplesRoutingModule { }
