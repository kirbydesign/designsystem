import { Component } from '@angular/core';

import { SegmentItem } from '@kirbydesign/designsystem';

const config = {
  template: `<kirby-segmented-control
  [items]="items"
  [value]="selectedSegment"
></kirby-segmented-control>
`,
  codeSnippet: `items: SegmentItem[] = [
  {
    text: 'First item',
    id: 'first',
    badge: {
      content: '4',
      description: '4 unread messages',
      themeColor: 'warning',
    },
  },
  {
    text: 'Second item',
    id: 'second',
    badge: {
      icon: 'attach',
      description: 'Item with attachment',
      themeColor: 'success',
    },
  },
];`,
};
@Component({
  selector: 'cookbook-segmented-control-example-with-badge',
  template: config.template,
  styleUrls: ['./with-badge.scss'],
})
export class SegmentedControlExampleWithBadgeComponent {
  codeSnippet = config.codeSnippet;

  items: SegmentItem[] = [
    {
      text: 'First item',
      id: 'first',
      badge: {
        content: '4',
        description: '4 unread messages',
        themeColor: 'warning',
      },
    },
    {
      text: 'Second item',
      id: 'second',
      badge: {
        icon: 'attach',
        description: 'Item with attachment',
        themeColor: 'success',
      },
    },
  ];

  selectedSegment: SegmentItem = this.items[0];
}
