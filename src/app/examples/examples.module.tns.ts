import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';

import { KirbyModule } from '../../kirby/kirby.module';
import { COMPONENT_DECLARATIONS } from './examples.common';
// tslint:disable-next-line:max-line-length
import { NativeScriptDoughnutChartExampleComponent } from './nativescript-only/doughnut-chart-example/doughnut-chart-example.component.tns-only';
// tslint:disable-next-line:max-line-length
import { NativeScriptLineChartExampleComponent } from './nativescript-only/line-chart-example/line-chart-example.component.tns-only';
// tslint:disable-next-line:max-line-length
import { ListSectionExampleComponent } from '~/app/examples/list-example/tns-list-examples/list-section-example/list-section-example.component';
import { ListCustomCellLinesExampleComponent } from '~/app/examples/list-example/tns-list-examples/list-custom-cell-lines-example/list-custom-cell-lines-example.component';

const nativeScriptDeclarations = [
    ...COMPONENT_DECLARATIONS,
    NativeScriptDoughnutChartExampleComponent,
    NativeScriptLineChartExampleComponent,
    ListSectionExampleComponent,
    ListCustomCellLinesExampleComponent,
];

@NgModule({
    imports: [
        NativeScriptCommonModule,
        KirbyModule
    ],
    declarations: nativeScriptDeclarations,
    exports: nativeScriptDeclarations,
    schemas: [NO_ERRORS_SCHEMA]
})
export class ExamplesModule {
}
