import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { KirbyModule } from '@kirbydesign/designsystem';
import { COMPONENT_IMPORTS, COMPONENT_EXPORTS, COMPONENT_DECLARATIONS } from './showcase.common';
import { CodeViewerComponent } from '../shared/code-viewer/code-viewer.component';
import { ExampleViewerComponent } from '../shared/example-viewer/example-viewer.component';
import { ShowcasePropertiesComponent } from '../shared/showcase-properties/showcase-properties.component';
import { IphoneModule } from '../iphone/iphone.module';
import { DividerShowcaseComponent } from './divider-showcase/divider-showcase.component';
import { TextLinkExampleModule } from '../examples/text-link-example/text-link-example.module';
import { TextLinkShowcaseComponent } from './text-link-showcase/text-link-showcase.component';

@NgModule({
  imports: [
    ...COMPONENT_IMPORTS,
    CommonModule,
    FormsModule,
    IonicModule,
    KirbyModule,
    IphoneModule,
    TextLinkExampleModule,
  ],
  declarations: [
    ...COMPONENT_DECLARATIONS,
    CodeViewerComponent,
    ExampleViewerComponent,
    ShowcasePropertiesComponent,
    DividerShowcaseComponent,
    TextLinkShowcaseComponent,
  ],
  exports: COMPONENT_EXPORTS,
})
export class ShowcaseModule {}
