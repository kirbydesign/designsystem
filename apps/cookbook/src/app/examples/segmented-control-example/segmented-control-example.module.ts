import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import {
  ButtonComponent,
  ItemModule,
  ListModule,
  SegmentedControlComponent,
} from '@kirbydesign/designsystem';
import { CardModule } from '@kirbydesign/designsystem/card';
import { SegmentedControlExampleColorComponent } from './color/color';

import { SegmentedControlExampleComponent } from './segmented-control-example.component';
import { SegmentedControlExampleDefaultComponent } from './default/default';
import { SegmentedControlExampleGroupedComponent } from './grouped/grouped';
import { SegmentedControlExampleWithBadgeComponent } from './with-badge/with-badge';

const COMPONENT_DECLARATIONS = [
  SegmentedControlExampleComponent,
  SegmentedControlExampleDefaultComponent,
  SegmentedControlExampleGroupedComponent,
  SegmentedControlExampleWithBadgeComponent,
  SegmentedControlExampleColorComponent,
];

@NgModule({
  imports: [
    CommonModule,
    SegmentedControlComponent,
    ButtonComponent,
    CardModule,
    ItemModule,
    ListModule,
  ],
  declarations: COMPONENT_DECLARATIONS,
  exports: COMPONENT_DECLARATIONS,
})
export class SegmentedControlExampleModule {}
