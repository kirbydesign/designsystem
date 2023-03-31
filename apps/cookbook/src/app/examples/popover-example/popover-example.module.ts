import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { KirbyModule } from '@kirbydesign/designsystem';
import { KirbyModalModule } from '@kirbydesign/designsystem/modal/v2';

import { FloatingDirective } from '@kirbydesign/designsystem/shared/floating';

import { PopoverExampleComponent } from './popover-example.component';

const COMPONENT_DECLARATIONS = [PopoverExampleComponent];

@NgModule({
  declarations: COMPONENT_DECLARATIONS,
  imports: [CommonModule, KirbyModule, KirbyModalModule, FloatingDirective],
  exports: COMPONENT_DECLARATIONS,
})
export class PopoverExampleModule {}
