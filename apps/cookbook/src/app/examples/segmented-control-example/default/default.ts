import { Component } from '@angular/core';

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
  styleUrls: ['./default.scss'],
})
export class SegmentedControlExampleDefaultComponent extends SegmentedControlExampleBaseComponent {
  template = config.template;
  codeSnippet = config.codeSnippet;
}
