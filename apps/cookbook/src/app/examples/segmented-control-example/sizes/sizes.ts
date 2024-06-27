import { Component } from '@angular/core';

import { SegmentedControlExampleBaseComponent } from '../segmented-control-example-base';

const config = {
  template: `<kirby-segmented-control
  [items]="items"
  [value]="selectedSegment"
  size="sm"
></kirby-segmented-control>

<kirby-segmented-control
  [items]="items"
  [value]="selectedSegment"
  size="md"
></kirby-segmented-control>`,
};
@Component({
  selector: 'cookbook-segmented-control-example-sizes',
  template: config.template,
  styleUrls: ['../segmented-control-examples.shared.scss'],
})
export class SegmentedControlExampleSizesComponent extends SegmentedControlExampleBaseComponent {
  template = config.template;
}
