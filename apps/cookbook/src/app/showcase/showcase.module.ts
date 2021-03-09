import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { KirbyModule } from '@kirbydesign/designsystem';

import { IphoneModule } from '../iphone/iphone.module';
import { ShowcaseEventsComponent } from '../shared/api-description/api-description-events/api-description-events.component';
import { ShowcaseMethodsComponent } from '../shared/api-description/api-description-methods/api-description-methods.component';
import { ShowcasePropertiesComponent } from '../shared/api-description/api-description-properties/api-description-properties.component';
import { CodeViewerComponent } from '../shared/code-viewer/code-viewer.component';
import { ExampleViewerComponent } from '../shared/example-viewer/example-viewer.component';

import { DividerShowcaseComponent } from './divider-showcase/divider-showcase.component';
import { COMPONENT_DECLARATIONS, COMPONENT_EXPORTS, COMPONENT_IMPORTS } from './showcase.common';

@NgModule({
  imports: [
    ...COMPONENT_IMPORTS,
    CommonModule,
    FormsModule,
    IonicModule,
    KirbyModule.forChild({ moduleRootRoutePath: '/home/showcase' }),
    IphoneModule,
  ],
  declarations: [
    ...COMPONENT_DECLARATIONS,
    CodeViewerComponent,
    ExampleViewerComponent,
    ShowcaseEventsComponent,
    ShowcaseMethodsComponent,
    ShowcasePropertiesComponent,
    DividerShowcaseComponent,
  ],
  exports: COMPONENT_EXPORTS,
})
export class ShowcaseModule {}
