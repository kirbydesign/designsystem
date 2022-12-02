import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { KirbyModalModule, KirbyModule } from '@kirbydesign/designsystem';

import { ExamplesSharedModule } from '../examples.shared.module';

import { FullscreenModalExperimentalExampleComponent } from './fullscreen/fullscreen-experimental-example.component';
import { ModalControllerExperimentalExampleComponent } from './controller/modal-controller-experimental-example.component';
import { ModalRouteExperimentalPage1ExampleComponent } from './modal-route-example/modal-route-page1-example.component';

const COMPONENT_DECLARATIONS = [
  FullscreenModalExperimentalExampleComponent,
  ModalControllerExperimentalExampleComponent,
  ModalRouteExperimentalPage1ExampleComponent,
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
