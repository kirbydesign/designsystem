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
import { FirstEmbeddedModalExampleComponent } from './modal-example/first-embedded-modal-example/first-embedded-modal-example.component';
import { SecondEmbeddedModalExampleComponent } from './modal-example/second-embedded-modal-example/second-embedded-modal-example.component';
import {
  CustomIconSettings,
  CUSTOM_FONT_SETTINGS,
} from '../../kirby/components/icon/custom-icon-settings';

const nativeScriptDeclarations = [
  ...COMPONENT_DECLARATIONS,
  NativeScriptDoughnutChartExampleComponent,
  NativeScriptLineChartExampleComponent,
  ListSectionExampleComponent,
  ListCustomCellLinesExampleComponent,
  ListItemExampleComponent,
];

export const customIconSettings: CustomIconSettings = {
  font: '[PATH_TO_TTF_FILE]',
  icons: [
    {
      name: 'horse',
      svg: '[PATH_TO_SVG_FILE]',
      unicode: '[UNICODE_FROM_TTF_FILE]',
    },
    {
      name: 'happy',
      svg: 'assets/icons/happy.svg',
      unicode: '0xf389',
    },
  ],
};

@NgModule({
  imports: [NativeScriptCommonModule, KirbyModule],
  declarations: nativeScriptDeclarations,
  entryComponents: [FirstEmbeddedModalExampleComponent, SecondEmbeddedModalExampleComponent],
  exports: nativeScriptDeclarations,
  providers: [
    {
      provide: CUSTOM_FONT_SETTINGS,
      useValue: customIconSettings,
      multi: true,
    },
  ],
  schemas: [NO_ERRORS_SCHEMA],
})
export class ExamplesModule {}
