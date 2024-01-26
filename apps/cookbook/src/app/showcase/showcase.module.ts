import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { KirbyModule } from '@kirbydesign/designsystem';
import { IonIcon } from '@ionic/angular/standalone';
import { KirbyModalModule } from '@kirbydesign/designsystem/modal/v2';

import { IphoneModule } from '../iphone/iphone.module';
import { ApiDescriptionEventsComponent } from '../shared/api-description/api-description-events/api-description-events.component';
import { ApiDescriptionMethodsComponent } from '../shared/api-description/api-description-methods/api-description-methods.component';
import { ApiDescriptionPropertiesComponent } from '../shared/api-description/api-description-properties/api-description-properties.component';
import { CodeViewerModule } from '../shared/code-viewer/code-viewer.module';
import { ExampleViewerComponent } from '../shared/example-viewer/example-viewer.component';

import { DividerShowcaseComponent } from './divider-showcase/divider-showcase.component';
import { COMPONENT_DECLARATIONS, COMPONENT_EXPORTS, COMPONENT_IMPORTS } from './showcase.common';

@NgModule({
  imports: [
    ...COMPONENT_IMPORTS,
    CommonModule,
    FormsModule,
    KirbyModule.forChild({ moduleRootRoutePath: '/home/showcase' }),
    KirbyModalModule,
    IphoneModule,
    RouterModule,
    CodeViewerModule,
    IonIcon,
  ],
  declarations: [
    ...COMPONENT_DECLARATIONS,
    ExampleViewerComponent,
    ApiDescriptionEventsComponent,
    ApiDescriptionMethodsComponent,
    ApiDescriptionPropertiesComponent,
    DividerShowcaseComponent,
  ],
  exports: COMPONENT_EXPORTS,
})
export class ShowcaseModule {}
