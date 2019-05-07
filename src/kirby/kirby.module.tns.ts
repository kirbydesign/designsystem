import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { NativeScriptUIChartModule } from 'nativescript-ui-chart/angular';
import { NativeScriptUIListViewModule } from 'nativescript-ui-listview/angular';
import { overrideModalViewMethod, ModalStack } from 'nativescript-windowed-modal';
import { registerElement } from 'nativescript-angular';

import { declarations, providerDeclarations } from './kirby.common';
// tslint:disable-next-line:max-line-length
import { NativeScriptDoughnutChartComponent } from './components/nativescript-only/doughnut-chart/doughnut-chart.component.tns-only';
// tslint:disable-next-line:max-line-length
import { NativeScriptLineChartComponent } from './components/nativescript-only/line-chart/line-chart.component.tns-only';
import { ModalWindowComponent } from './components/modal/modal-window.component';
import { ActionSheetComponent } from './components/action-sheet/action-sheet.component';

overrideModalViewMethod();
registerElement('ModalStack', () => ModalStack);

// tslint:disable-next-line:max-line-length
const nativeScriptDeclarations = [
  ...declarations,
  NativeScriptDoughnutChartComponent,
  NativeScriptLineChartComponent,
];

@NgModule({
  imports: [
    NativeScriptCommonModule,
    NativeScriptRouterModule,
    NativeScriptUIChartModule,
    NativeScriptUIListViewModule,
  ],
  providers: providerDeclarations,
  entryComponents: [ModalWindowComponent, ActionSheetComponent],
  declarations: nativeScriptDeclarations,
  exports: nativeScriptDeclarations,
  schemas: [NO_ERRORS_SCHEMA],
})
export class KirbyModule {}
