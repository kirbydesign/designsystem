// tslint:disable:disallow-tns-import

import { NgModule } from '@angular/core';
import { NativeScriptRouterModule } from 'nativescript-angular/router';

import { routes } from './examples.routes';
import { ExamplesModule } from './examples.module';
import { NativeScriptDoughnutChartExampleComponent } from './nativescript-only/doughnut-chart-example/doughnut-chart-example.component.tns-only';
import { NativeScriptLineChartExampleComponent } from './nativescript-only/line-chart-example/line-chart-example.component.tns-only';
import { ListSectionExampleComponent } from './nativescript-only/list-section-example/list-section-example.component.tns';
import { ListCustomCellLinesExampleComponent } from './list/list-custom-cell-lines-example/list-custom-cell-lines-example.component.tns';
import { ListItemExampleComponent } from './list/list-item-example/list-item-example.component.tns';
import { ListLoadOnDemandExampleComponent } from './list/load-on-demand/list-load-on-demand-example.component';
import { ListHeaderAndFooterExampleComponent } from './nativescript-only/list-header-and-footer/list-header-and-footer-example.component.tns';

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
      {
        path: 'header-and-footer',
        component: ListHeaderAndFooterExampleComponent,
      },
    ],
  },
];

@NgModule({
  imports: [NativeScriptRouterModule.forChild(nativeScriptRoutes), ExamplesModule],
  exports: [NativeScriptRouterModule],
})
export class ExamplesRoutingModule {}
