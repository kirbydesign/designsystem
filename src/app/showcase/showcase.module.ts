import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {ExamplesModule} from '~/app/examples/examples.module';
import {ShowcaseRoutingModule} from './showcase-routing.module';
import {ShowcaseComponent} from './showcase.component';
import {ButtonShowcaseComponent} from './button-showcase/button-showcase.component';
import {CardShowcaseComponent} from './card-showcase/card-showcase.component';
import {ComponentTemplateViewerComponent} from '~/app/shared/component-template-viewer/component-template-viewer.component';
import {HtmlViewerComponent} from '~/app/shared/html-viewer/html-viewer.component';

const exportedComponents = [
  CardShowcaseComponent,
  ButtonShowcaseComponent,
];

const declarations = [
  ...exportedComponents,
  ShowcaseComponent,
  HtmlViewerComponent,
  ComponentTemplateViewerComponent,
];

@NgModule({
  imports: [
    CommonModule,
    ExamplesModule,
    ShowcaseRoutingModule
  ],
  declarations: declarations,
  exports: exportedComponents
})
export class ShowcaseModule { }
