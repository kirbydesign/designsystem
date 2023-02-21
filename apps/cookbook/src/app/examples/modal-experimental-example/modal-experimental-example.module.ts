import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { KirbyModule } from '@kirbydesign/designsystem';

import { KirbyModalModule } from '@kirbydesign/designsystem/modal/experimental';
import { ExamplesSharedModule } from '../examples.shared.module';

import { FullscreenModalExperimentalExampleComponent } from './fullscreen/fullscreen-experimental-example.component';
import { ModalControllerExperimentalExampleComponent } from './controller/modal-controller-experimental-example.component';
import { ModalRoutingExperimentalExampleComponent } from './modal-routing/modal-routing-experimental-example.component';
import { ModalRoutingExperimentalExamplePage1Component } from './modal-routing/modal-routing-experimental-example-page1.component';
import { ModalRoutingExperimentalExamplePage2Component } from './modal-routing/modal-routing-experimental-example-page2.component';

const COMPONENT_DECLARATIONS = [
  FullscreenModalExperimentalExampleComponent,
  ModalControllerExperimentalExampleComponent,
  ModalRoutingExperimentalExampleComponent,
  ModalRoutingExperimentalExamplePage1Component,
  ModalRoutingExperimentalExamplePage2Component,
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    KirbyModule,
    KirbyModalModule,
    ExamplesSharedModule,
    FormsModule,
  ],
  declarations: COMPONENT_DECLARATIONS,
  exports: COMPONENT_DECLARATIONS,
})
export class ModalExperimentalExampleModule {}
