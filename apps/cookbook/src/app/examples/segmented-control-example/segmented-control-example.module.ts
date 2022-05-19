import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { KirbyModule } from '@kirbydesign/designsystem';

import { SegmentedControlExampleDefaultComponent } from './default/default';
import { SegmentedControlExampleGroupedComponent } from './grouped/grouped';
import { SegmentedControlExampleInsideScrollableComponent } from './scrollable/inside-scrollable-element';
import { SegmentedControlExampleScrollableComponent } from './scrollable/scrollable';
import { SegmentedControlExampleWithBadgeComponent } from './with-badge/with-badge';

const COMPONENT_DECLARATIONS = [
  SegmentedControlExampleDefaultComponent,
  SegmentedControlExampleGroupedComponent,
  SegmentedControlExampleScrollableComponent,
  SegmentedControlExampleInsideScrollableComponent,
  SegmentedControlExampleWithBadgeComponent,
];

@NgModule({
  imports: [CommonModule, KirbyModule],
  declarations: COMPONENT_DECLARATIONS,
  exports: COMPONENT_DECLARATIONS,
})
export class SegmentedControlExampleModule {}
