import { Component, OnInit } from '@angular/core';

import { SegmentItem } from '@kirbydesign/designsystem';

@Component({
  selector: 'kirby-segmented-control-example',
  templateUrl: './segmented-control-example.component.html',
  styleUrls: ['./segmented-control-example.component.scss'],
})
export class SegmentedControlExampleComponent implements OnInit {
  activeSegment: SegmentItem;

  items: SegmentItem[] = [
    {
      text: 'First item',
      id: 'first',
      checked: true,
      badge: {
        content: '4',
        themeColor: 'warning',
      },
    },
    {
      text: 'Second item',
      checked: false,
      id: 'second',
    },
  ];

  ngOnInit() {
    const checkedSegment = this.items.find((segment) => segment.checked === true);
    this.activeSegment = checkedSegment;
  }

  onSegmentClick(id) {
    this.activeSegment = id;
  }
}
