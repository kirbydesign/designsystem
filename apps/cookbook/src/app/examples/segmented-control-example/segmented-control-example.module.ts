import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KirbyModule } from '@kirbydesign/designsystem';
import { SegmentedControlExampleDefaultComponent } from './default/default';
import { SegmentedControlExampleGroupedComponent } from './grouped/grouped';

const COMPONENT_DECLARATIONS = [
  SegmentedControlExampleDefaultComponent,
  SegmentedControlExampleGroupedComponent,
];

@NgModule({
  imports: [CommonModule, KirbyModule],
  declarations: COMPONENT_DECLARATIONS,
  exports: COMPONENT_DECLARATIONS,
})
export class SegmentedControlExampleModule {}
