// tslint:disable:disallow-tns-import

import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { NativeScriptFormsModule } from 'nativescript-angular';

import { KirbyModule } from '../../kirby/kirby.module';
import { COMPONENT_DECLARATIONS } from './examples.common';
import { NativeScriptDoughnutChartExampleComponent } from './nativescript-only/doughnut-chart-example/doughnut-chart-example.component.tns-only';
import { NativeScriptLineChartExampleComponent } from './nativescript-only/line-chart-example/line-chart-example.component.tns-only';
import { ListItemExampleComponent } from './list/list-item-example/list-item-example.component.tns';
import { ListCustomCellLinesExampleComponent } from './list/list-custom-cell-lines-example/list-custom-cell-lines-example.component.tns';
import { ListSectionExampleComponent } from './nativescript-only/list-section-example/list-section-example.component.tns';

const nativeScriptDeclarations = [
  ...COMPONENT_DECLARATIONS,
  NativeScriptDoughnutChartExampleComponent,
  NativeScriptLineChartExampleComponent,
  ListSectionExampleComponent,
  ListCustomCellLinesExampleComponent,
  ListItemExampleComponent,
];

@NgModule({
  imports: [NativeScriptCommonModule, KirbyModule, NativeScriptFormsModule],
  declarations: nativeScriptDeclarations,
  exports: nativeScriptDeclarations,
  schemas: [NO_ERRORS_SCHEMA],
})
export class ExamplesModule {}
