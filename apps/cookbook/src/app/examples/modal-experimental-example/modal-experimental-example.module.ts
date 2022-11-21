import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { KirbyModalModule, KirbyModule } from '@kirbydesign/designsystem';

import { ExamplesSharedModule } from '../examples.shared.module';

import { FullscreenModalExperimentalExampleComponent } from './fullscreen/fullscreen-experimental-example.component';
import { ModalControllerExperimentalExampleComponent } from './controller/modal-controller-experimental-example.component';

const COMPONENT_DECLARATIONS = [
  FullscreenModalExperimentalExampleComponent,
  ModalControllerExperimentalExampleComponent,
];

@NgModule({
  imports: [CommonModule, RouterModule, KirbyModule, KirbyModalModule, ExamplesSharedModule],
  declarations: COMPONENT_DECLARATIONS,
  exports: COMPONENT_DECLARATIONS,
})
export class ModalExperimentalExampleModule {}
