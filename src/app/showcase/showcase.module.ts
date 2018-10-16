import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {COMPONENT_IMPORTS, COMPONENT_EXPORTS, COMPONENT_DECLARATIONS} from './showcase.common';
import {HtmlViewerComponent} from '../shared/html-viewer/html-viewer.component';
import { ModalShowcaseComponent } from './modal-showcase/modal-showcase.component';

@NgModule({
  imports: [
    ...COMPONENT_IMPORTS,
    CommonModule,
  ],
  declarations: [
    ...COMPONENT_DECLARATIONS,
    HtmlViewerComponent,
    ModalShowcaseComponent
  ],
  exports: COMPONENT_EXPORTS
})
export class ShowcaseModule { }
