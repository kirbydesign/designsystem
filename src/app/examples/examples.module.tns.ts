// tslint:disable:disallow-tns-import

import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';

import { KirbyModule } from '../../kirby/kirby.module';
import { COMPONENT_DECLARATIONS } from './examples.common';
import { NativeScriptDoughnutChartExampleComponent } from './nativescript-only/doughnut-chart-example/doughnut-chart-example.component.tns-only';
import { NativeScriptLineChartExampleComponent } from './nativescript-only/line-chart-example/line-chart-example.component.tns-only';
import { ListSectionExampleComponent } from './list/tns-list-examples/list-section-example/list-section-example.component.tns';
import { ListCustomCellLinesExampleComponent } from './list/tns-list-examples/list-custom-cell-lines-example/list-custom-cell-lines-example.component.tns';
import { ListItemExampleComponent } from './list/tns-list-examples/list-item-example/list-item-example.component.tns';

const nativeScriptDeclarations = [
  ...COMPONENT_DECLARATIONS,
  NativeScriptDoughnutChartExampleComponent,
  NativeScriptLineChartExampleComponent,
  ListSectionExampleComponent,
  ListCustomCellLinesExampleComponent,
  ListItemExampleComponent,
];

@NgModule({
  imports: [NativeScriptCommonModule, KirbyModule],
  declarations: nativeScriptDeclarations,
  exports: nativeScriptDeclarations,
  schemas: [NO_ERRORS_SCHEMA],
})
export class ExamplesModule {}
