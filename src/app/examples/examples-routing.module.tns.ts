// tslint:disable:disallow-tns-import

import { NgModule } from '@angular/core';
import { NativeScriptRouterModule } from 'nativescript-angular/router';

import { routes } from './examples.routes';
import { ExamplesModule } from './examples.module';
import { NativeScriptDoughnutChartExampleComponent } from './nativescript-only/doughnut-chart-example/doughnut-chart-example.component.tns-only';
import { NativeScriptLineChartExampleComponent } from './nativescript-only/line-chart-example/line-chart-example.component.tns-only';
import { ListLoadOnDemandExampleComponent } from './list/load-on-demand/list-load-on-demand-example.component';
import { ListCustomCellLinesExampleComponent } from '~/app/examples/list/list-custom-cell-lines-example/list-custom-cell-lines-example.component.tns';
import { ListItemExampleComponent } from '~/app/examples/list/list-item-example/list-item-example.component.tns';
import { ListSectionExampleComponent } from '~/app/examples/nativescript-only/list-section-example/list-section-example.component.tns';

const nativeScriptRoutes = [
  ...routes,
  {
    path: 'nativescript-only',
    children: [
      {
        path: 'doughnut-chart',
        component: NativeScriptDoughnutChartExampleComponent,
      },
      {
        path: 'line-chart',
        component: NativeScriptLineChartExampleComponent,
      },
    ],
  },
  {
    path: 'list',
    children: [
      {
        path: 'section',
        component: ListSectionExampleComponent,
      },
      {
        path: 'custom',
        component: ListCustomCellLinesExampleComponent,
      },
      {
        path: 'original',
        component: ListItemExampleComponent,
      },
      {
        path: 'load-on-demand',
        component: ListLoadOnDemandExampleComponent,
      },
    ],
  },
];

@NgModule({
  imports: [NativeScriptRouterModule.forChild(nativeScriptRoutes), ExamplesModule],
  exports: [NativeScriptRouterModule],
})
export class ExamplesRoutingModule {}
