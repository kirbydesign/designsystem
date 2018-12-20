import { NgModule } from '@angular/core';
import { NativeScriptRouterModule } from 'nativescript-angular/router';

import { routes } from './examples.routes';
import { ExamplesModule } from './examples.module';
// tslint:disable-next-line:max-line-length
import { NativeScriptDoughnutChartExampleComponent } from './nativescript-only/doughnut-chart-example/doughnut-chart-example.component.tns-only';

const nativeScriptRoutes = [...routes,
  {
    path: 'nativescript-only',
    children: [
      {
        path: 'doughnut-chart',
        component: NativeScriptDoughnutChartExampleComponent
      }
    ]
  }
];

@NgModule({
  imports: [NativeScriptRouterModule.forChild(nativeScriptRoutes), ExamplesModule],
  exports: [NativeScriptRouterModule]
})
export class ExamplesRoutingModule { }
