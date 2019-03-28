import { Component, OnInit } from '@angular/core';

import { SegmentItem } from '~/kirby/components/segmented-control/segment-item';

@Component({
  selector: 'kirby-segmented-control-example',
  templateUrl: './segmented-control-example.component.html',
  styleUrls: ['./segmented-control-example.component.scss'],
})
export class SegmentedControlExampleComponent implements OnInit {
  segmentItems: SegmentItem[] = [
    {
      text: 'First item',
      value: 'first',
      badge: 0,
    },
    {
      text: 'Second item',
      value: 'second',
      badge: 1,
    },
  ];

  constructor() {}

  ngOnInit() {}
}
