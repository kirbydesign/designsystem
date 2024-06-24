import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import {
  ButtonComponent,
  ItemModule,
  ListModule,
  SegmentedControlComponent,
} from '@kirbydesign/designsystem';
import { CardModule } from '@kirbydesign/designsystem/card';

import { SegmentedControlExampleComponent } from './segmented-control-example.component';
import { SegmentedControlExampleDefaultComponent } from './default/default';
import { SegmentedControlExampleSizesComponent } from './sizes/sizes';
import { SegmentedControlExampleModesComponent } from './modes/modes';
import { SegmentedControlExampleGroupedComponent } from './grouped/grouped';
import { SegmentedControlExampleWithBadgeComponent } from './with-badge/with-badge';
import { SegmentedControlExampleColorComponent } from './color/color';

const COMPONENT_DECLARATIONS = [
  SegmentedControlExampleComponent,
  SegmentedControlExampleDefaultComponent,
  SegmentedControlExampleSizesComponent,
  SegmentedControlExampleModesComponent,
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
