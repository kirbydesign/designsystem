// tslint:disable:disallow-tns-import

import { NgModule } from '@angular/core';
import { NativeScriptRouterModule } from 'nativescript-angular/router';

import { routes } from './examples.routes';
import { ExamplesModule } from './examples.module';
import { NativeScriptDoughnutChartExampleComponent } from './nativescript-only/doughnut-chart-example/doughnut-chart-example.component.tns-only';
import { NativeScriptLineChartExampleComponent } from './nativescript-only/line-chart-example/line-chart-example.component.tns-only';
import { ListSectionExampleComponent } from './list-example/tns-list-examples/list-section-example/list-section-example.component.tns';
import { ListCustomCellLinesExampleComponent } from './list-example/tns-list-examples/list-custom-cell-lines-example/list-custom-cell-lines-example.component.tns';
import { ListItemExampleComponent } from './list-example/tns-list-examples/list-item-example/list-item-example.component.tns';
import { ListLoadMoreExampleComponent } from './list-example/tns-list-examples/list-load-more-example/list-load-more-example.component.tns';

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
        path: 'loadmore',
        component: ListLoadMoreExampleComponent,
      },
    ],
  },
];

@NgModule({
  imports: [NativeScriptRouterModule.forChild(nativeScriptRoutes), ExamplesModule],
  exports: [NativeScriptRouterModule],
})
export class ExamplesRoutingModule {}
