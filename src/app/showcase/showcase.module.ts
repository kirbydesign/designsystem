import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { KirbyModule } from '@kirbydesign/designsystem';
import { COMPONENT_IMPORTS, COMPONENT_EXPORTS, COMPONENT_DECLARATIONS } from './showcase.common';
import { CodeViewerComponent } from '../shared/code-viewer/code-viewer.component';
import { ShowcasePropertiesComponent } from '../shared/showcase-properties/showcase-properties.component';
import { FabSheetShowcaseComponent } from './fab-sheet-showcase/fab-sheet-showcase.component';

@NgModule({
  imports: [...COMPONENT_IMPORTS, CommonModule, FormsModule, IonicModule.forRoot(), KirbyModule],
  declarations: [...COMPONENT_DECLARATIONS, CodeViewerComponent, ShowcasePropertiesComponent, FabSheetShowcaseComponent],
  exports: COMPONENT_EXPORTS,
})
export class ShowcaseModule {}
