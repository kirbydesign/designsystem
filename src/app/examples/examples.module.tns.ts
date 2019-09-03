// tslint:disable:disallow-tns-import

import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';

import { KirbyModule } from '../../kirby/kirby.module';
import { COMPONENT_DECLARATIONS, PROVIDER_DECLARATIONS } from './examples.common';
import { NativeScriptDoughnutChartExampleComponent } from './nativescript-only/doughnut-chart-example/doughnut-chart-example.component.tns-only';
import { NativeScriptLineChartExampleComponent } from './nativescript-only/line-chart-example/line-chart-example.component.tns-only';
import { ListItemExampleComponent } from './list/list-item-example/list-item-example.component.tns';
import { ListCustomCellLinesExampleComponent } from './list/list-custom-cell-lines-example/list-custom-cell-lines-example.component.tns';
import { ListSectionExampleComponent } from './nativescript-only/list-section-example/list-section-example.component.tns';
import { FirstEmbeddedModalExampleComponent } from './modal-example/first-embedded-modal-example/first-embedded-modal-example.component';
import { SecondEmbeddedModalExampleComponent } from './modal-example/second-embedded-modal-example/second-embedded-modal-example.component';
import { ListHeaderAndFooterExampleComponent } from './nativescript-only/list-header-and-footer/list-header-and-footer-example.component.tns';

const nativeScriptDeclarations = [
  ...COMPONENT_DECLARATIONS,
  NativeScriptDoughnutChartExampleComponent,
  NativeScriptLineChartExampleComponent,
  ListSectionExampleComponent,
  ListHeaderAndFooterExampleComponent,
  ListCustomCellLinesExampleComponent,
  ListItemExampleComponent,
];

@NgModule({
  imports: [NativeScriptCommonModule, KirbyModule],
  declarations: nativeScriptDeclarations,
  entryComponents: [FirstEmbeddedModalExampleComponent, SecondEmbeddedModalExampleComponent],
  exports: nativeScriptDeclarations,
  providers: [PROVIDER_DECLARATIONS],
  schemas: [NO_ERRORS_SCHEMA],
})
export class ExamplesModule {}
