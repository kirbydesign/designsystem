import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { KirbyModule } from '@kirbydesign/designsystem';

import { SegmentedControlExampleDefaultComponent } from './default/default';
import { SegmentedControlExampleGroupedComponent } from './grouped/grouped';
import { SegmentedControlExampleWithBadgeComponent } from './with-badge/with-badge';

const COMPONENT_DECLARATIONS = [
  SegmentedControlExampleDefaultComponent,
  SegmentedControlExampleGroupedComponent,
  SegmentedControlExampleWithBadgeComponent,
];

@NgModule({
  imports: [CommonModule, KirbyModule],
  declarations: COMPONENT_DECLARATIONS,
  exports: COMPONENT_DECLARATIONS,
})
export class SegmentedControlExampleModule {}
