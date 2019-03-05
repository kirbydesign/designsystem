import { NgModule } from '@angular/core';
import { NativeScriptRouterModule } from 'nativescript-angular/router';

import { routes } from './examples.routes';
import { ListLoadMoreExampleComponent } from './list-example/tns-list-examples/list-load-more-example/list-load-more-example.component';
import { ExamplesModule } from './examples.module';
// tslint:disable-next-line:max-line-length
import { NativeScriptDoughnutChartExampleComponent } from './nativescript-only/doughnut-chart-example/doughnut-chart-example.component.tns-only';
// tslint:disable-next-line:max-line-length
import { NativeScriptLineChartExampleComponent } from './nativescript-only/line-chart-example/line-chart-example.component.tns-only';
// tslint:disable-next-line
import { ListSectionExampleComponent } from './list-example/tns-list-examples/list-section-example/list-section-example.component.tns';
// tslint:disable-next-line
import { ListCustomCellLinesExampleComponent } from './list-example/tns-list-examples/list-custom-cell-lines-example/list-custom-cell-lines-example.component.tns';
// tslint:disable-next-line
import { ListItemExampleComponent } from './list-example/tns-list-examples/list-item-example/list-item-example.component.tns';

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
