import { Component } from '@angular/core';
import { SegmentedControlExampleDefaultComponent } from './default/default';
import { SegmentedControlExampleSizesComponent } from './sizes/sizes';
import { SegmentedControlExampleModesComponent } from './modes/modes';
import { SegmentedControlExampleGroupedComponent } from './grouped/grouped';
import { SegmentedControlExampleWithBadgeComponent } from './with-badge/with-badge';
import { SegmentedControlExampleColorComponent } from './color/color';
import { SegmentedControlReactiveFormsExampleComponent } from './reactive-forms/reactive-forms';

@Component({
  selector: 'cookbook-segmented-control-example',
  templateUrl: './segmented-control-example.component.html',
  styleUrls: ['./segmented-control-example.component.scss'],
  imports: [
    SegmentedControlExampleDefaultComponent,
    SegmentedControlExampleSizesComponent,
    SegmentedControlExampleModesComponent,
    SegmentedControlExampleGroupedComponent,
    SegmentedControlExampleWithBadgeComponent,
    SegmentedControlExampleColorComponent,
    SegmentedControlReactiveFormsExampleComponent,
  ],
})
export class SegmentedControlExampleComponent {}
