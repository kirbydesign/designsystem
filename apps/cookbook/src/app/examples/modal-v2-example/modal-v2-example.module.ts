import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { KirbyModule } from '@kirbydesign/designsystem';

import { KirbyModalModule } from '@kirbydesign/designsystem/modal/v2';
import { ExamplesSharedModule } from '../examples.shared.module';

import { FullscreenModalV2ExampleComponent } from './modal/fullscreen/fullscreen-v2-example.component';
import { DrawerModalV2ExampleComponent } from './modal/drawer/drawer-v2-example.component';
import { ModalControllerV2ExampleComponent } from './controller/modal-controller-v2-example.component';
import { ModalRoutingV2ExampleComponent } from './modal-routing/modal-routing-v2-example.component';
import { ModalRoutingV2ExamplePage1Component } from './modal-routing/modal-routing-v2-example-page1.component';
import { ModalRoutingV2ExamplePage2Component } from './modal-routing/modal-routing-v2-example-page2.component';
import { NestedModalsV2ExampleComponent } from './nested-modals/nested-modals-v2-example.component';

const COMPONENT_DECLARATIONS = [
  FullscreenModalV2ExampleComponent,
  DrawerModalV2ExampleComponent,
  ModalControllerV2ExampleComponent,
  ModalRoutingV2ExampleComponent,
  ModalRoutingV2ExamplePage1Component,
  ModalRoutingV2ExamplePage2Component,
  NestedModalsV2ExampleComponent,
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
export class ModalV2ExampleModule {}
