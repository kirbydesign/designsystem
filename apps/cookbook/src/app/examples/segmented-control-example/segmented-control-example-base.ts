import { Component } from '@angular/core';

import { SegmentItem } from '@kirbydesign/designsystem';

@Component({ template: '' })
export abstract class SegmentedControlExampleBaseComponent {
  items: SegmentItem[] = [
    {
      text: 'First item',
      id: 'first',
    },
    {
      text: 'Second item',
      id: 'second',
    },
  ];

  selectedSegment: SegmentItem = this.items[0];

  onSegmentSelect(selectedSegment: SegmentItem) {
    this.selectedSegment = selectedSegment;
  }
}
