import { Component, OnInit } from '@angular/core';

import { SegmentedControlMode, SegmentItem } from '@kirbydesign/designsystem';

const config = {
  template: `<kirby-segmented-control
  [items]="items"
  [value]="selectedSegment"
  [size]="size"
></kirby-segmented-control>
<fieldset>
  <legend>Configuration</legend>
  <p [class.disabled]="mode !== 'default'">
    <strong>Size:</strong><br/>  
    <label>
      <input
        type="radio"
        name="example-with-badge-size"
        value="sm"
        [checked]="size === 'sm'"
        (change)="setSize($event.target.value)"
        [disabled]="mode !== 'default'"
      />
      Small (<code>sm</code>)
    </label>
    <label>
      <input
        type="radio"
        name="example-with-badge-size"
        value="md"
        [checked]="size === 'md'"
        (change)="setSize($event.target.value)"
        [disabled]="mode !== 'default'"
      />
      Medium (<code>md</code>) - default
    </label>
    </p>
</fieldset>
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
export class SegmentedControlExampleWithBadgeComponent implements OnInit {
  codeSnippet = config.codeSnippet;
  get template(): string {
    return config.template
      .split('<fieldset>')[0] // Remove config part of the template
      .replace('[mode]="mode"', `mode="${this.mode}"`)
      .replace('[size]="size"', `size="${this.size}"`);
  }

  mode: SegmentedControlMode = SegmentedControlMode.default;

  private _size: 'sm' | 'md' = 'md';
  get size(): 'sm' | 'md' {
    return this.mode === SegmentedControlMode.default ? this._size : 'sm';
  }

  selectedSegment: SegmentItem;

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

  ngOnInit() {
    this.selectedSegment = this.items[0];
  }

  setSize(size: 'sm' | 'md') {
    this._size = size;
  }
}
