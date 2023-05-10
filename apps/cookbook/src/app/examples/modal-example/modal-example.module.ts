import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { KirbyModule } from '@kirbydesign/designsystem';
import { KirbyModalModule } from '@kirbydesign/designsystem/modal/v2';

import { ExamplesSharedModule } from '../examples.shared.module';

import { ModalCompactExampleComponent } from './compact-example/modal-compact-example.component';
import { EmbeddedModalExampleComponent } from './embedded-modal-example/embedded-modal-example.component';
import { ModalExampleConfigurationComponent } from './modal-example-configuration/modal-example-configuration.component';
import { ModalExampleDefaultComponent } from './modal-example-default.component';
import { ModalExampleSizesComponent } from './modal-example-sizes.component';
import { ModalExampleOutletComponent } from './modal-example-outlet.component';
import { ModalExampleComponent } from './modal-example.component';
import { ModalRoutePage1ExampleComponent } from './modal-route-example/modal-route-page1-example.component';
import { ModalRoutePage2ExampleComponent } from './modal-route-example/modal-route-page2-example.component';

const COMPONENT_DECLARATIONS = [
  ModalExampleComponent,
  ModalExampleDefaultComponent,
  ModalExampleSizesComponent,
  ModalExampleConfigurationComponent,
  ModalExampleOutletComponent,
  EmbeddedModalExampleComponent,
  ModalCompactExampleComponent,
  ModalRoutePage1ExampleComponent,
  ModalRoutePage2ExampleComponent,
];

@NgModule({
  imports: [CommonModule, RouterModule, KirbyModule, KirbyModalModule, ExamplesSharedModule],
  declarations: COMPONENT_DECLARATIONS,
  exports: COMPONENT_DECLARATIONS,
})
export class ModalExampleModule {}
