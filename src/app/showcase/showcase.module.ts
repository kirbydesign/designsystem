import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { COMPONENT_IMPORTS, COMPONENT_EXPORTS, COMPONENT_DECLARATIONS } from './showcase.common';
import { HtmlViewerComponent } from '../shared/html-viewer/html-viewer.component';
import { ShowcasePropertiesComponent } from '../shared/showcase-properties/showcase-properties.component';

@NgModule({
  imports: [...COMPONENT_IMPORTS, CommonModule, FormsModule, IonicModule.forRoot()],
  declarations: [...COMPONENT_DECLARATIONS, HtmlViewerComponent, ShowcasePropertiesComponent],
  exports: COMPONENT_EXPORTS,
})
export class ShowcaseModule {}
