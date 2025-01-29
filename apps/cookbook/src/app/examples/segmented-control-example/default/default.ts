import { Component } from '@angular/core';

import { SegmentedControlComponent } from '@kirbydesign/designsystem';
import { CardModule } from '@kirbydesign/designsystem/card';
import { SegmentedControlExampleBaseComponent } from '../segmented-control-example-base';

const config = {
  template: `<kirby-segmented-control
  [items]="items"
  [value]="selectedSegment"
  (segmentSelect)="onSegmentSelect($event)"
></kirby-segmented-control>

<kirby-card hasPadding="true">
  <h2>Content for {{ selectedSegment.text }} segment</h2>
  <p>The selected segment has text "{{ selectedSegment.text }}" and id "{{ selectedSegment.id }}"</p>
</kirby-card>
`,
  codeSnippet: `onSegmentSelect(segment: SegmentItem) {
  this.selectedSegment = segment;
}`,
};
@Component({
  selector: 'cookbook-segmented-control-example-default',
  template: config.template,
  styleUrls: ['../segmented-control-examples.shared.scss'],
  imports: [SegmentedControlComponent, CardModule],
})
export class SegmentedControlExampleDefaultComponent extends SegmentedControlExampleBaseComponent {
  template = config.template;
  codeSnippet = config.codeSnippet;
}
