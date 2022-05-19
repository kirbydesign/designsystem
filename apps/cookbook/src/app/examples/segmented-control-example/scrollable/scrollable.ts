import { Component, OnInit } from '@angular/core';

import { SegmentItem } from '@kirbydesign/designsystem';

const config = {
  template: `<div style="width: 100%; max-width: 500px;">
    <kirby-segmented-control
        [items]="items"
        [value]="selectedSegment"
        [scrollable]="true"
    ></kirby-segmented-control>
</div>`,
};

@Component({
  selector: 'cookbook-segmented-control-example-scrollable',
  template: config.template,
})
export class SegmentedControlExampleScrollableComponent implements OnInit {
  selectedSegment: SegmentItem;
  template: string = config.template;

  private items: SegmentItem[] = [
    {
      text: 'First item',
      id: 'first',
    },
    {
      text: 'Second item',
      id: 'second',
    },
    {
      text: 'Third item',
      id: 'third',
    },
    {
      text: 'Fourth item',
      id: 'fourth',
    },
    {
      text: 'Fifth item',
      id: 'fifth',
    },
    {
      text: 'Sixth item',
      id: 'sixth',
    },
    {
      text: 'Seventh item',
      id: 'seventh',
    },
    {
      text: 'Eighth item',
      id: 'eighth',
    },
  ];

  ngOnInit(): void {
    this.selectedSegment = this.items[0];
  }
}
