import { Component, OnInit } from '@angular/core';

import { SegmentItem } from '~/kirby/components/segmented-control/segment-item';

@Component({
  selector: 'kirby-segmented-control-example',
  templateUrl: './segmented-control-example.component.html',
  styleUrls: ['./segmented-control-example.component.scss'],
})
export class SegmentedControlExampleComponent implements OnInit {
  activeSegment: string;

  segmentItems: SegmentItem[] = [
    {
      text: 'First item',
      value: 'first',
      checked: true,
      badge: {
        content: '2',
        type: 'danger',
      },
    },
    {
      text: 'Second item',
      checked: false,
      value: 'second',
    },
  ];

  constructor() {}

  ngOnInit() {}

  onSegmentClick(value) {
    this.activeSegment = value;
  }
}
