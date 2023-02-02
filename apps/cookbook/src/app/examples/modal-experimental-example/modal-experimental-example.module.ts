import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { KirbyModule } from '@kirbydesign/designsystem';

import { KirbyModalModule } from '@kirbydesign/designsystem/modal/experimental';
import { ExamplesSharedModule } from '../examples.shared.module';

import { FullscreenModalExperimentalExampleComponent } from './fullscreen/fullscreen-experimental-example.component';
import { ModalControllerExperimentalExampleComponent } from './controller/modal-controller-experimental-example.component';

const COMPONENT_DECLARATIONS = [
  FullscreenModalExperimentalExampleComponent,
  ModalControllerExperimentalExampleComponent,
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
