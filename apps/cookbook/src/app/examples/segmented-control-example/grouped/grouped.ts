import { Component, OnInit } from '@angular/core';

import { SegmentItem } from '@kirbydesign/designsystem';

const config = {
  template: `<div class="wrapper">
  <kirby-segmented-control
    size="sm"
    [items]="segmentItems"
    [selectedIndex]="selectedIndex"
    (segmentSelect)="onSegmentSelect($event)"
  ></kirby-segmented-control>
  <kirby-chip
    [text]="separateSegment.text"
    (click)="onSegmentSelect(separateSegment)"
    [isSelected]="selectedSegment === separateSegment">
  </kirby-chip>
</div>
<kirby-list [items]="filteredListItems">
  <kirby-item *kirbyListItemTemplate="let item">
    <kirby-label>
      <h3>{{ item.title }}</h3>
      <p detail>{{ item.mix.join(', ') }}</p>
    </kirby-label>
    <kirby-label slot="end">
      <data [value]="item.count">{{ item.count }}</data>
    </kirby-label>
  </kirby-item>
</kirby-list>
`,
  styles: [
    `.wrapper {
  display: flex;
  align-items: center;
  margin-bottom: 24px;
}

kirby-segmented-control {
  margin-right: 8px;
}
`,
    ``,
  ],

  codeSnippet: `selectedIndex = 0;
selectedSegment: SegmentItem;
  
segmentItems: SegmentItem[] = [
  { text: 'Stone', id: 'Stone' },
  { text: 'Rick', id: 'Rick' },
  { text: 'Gooey', id: 'Gooey' },
];

listItems = [...];

get filteredListItems() {
  const filter = this.selectedSegment.id;
  return filter === 'all'
    ? this.listItems
    : this.listItems.filter((item) => item.mix.indexOf(filter) > -1);
}

onSegmentSelect(segment: SegmentItem) {
  this.selectedSegment = segment;
  this.selectedIndex = this.segmentItems.indexOf(selectedSegment);
}`,
};
@Component({
  selector: 'cookbook-segmented-control-example-grouped',
  template: config.template,
  styles: config.styles,
})
export class SegmentedControlExampleGroupedComponent implements OnInit {
  template: string = config.template;
  styles: string = config.styles.join(`
`);
  codeSnippet: string = config.codeSnippet;

  selectedSegment: SegmentItem;
  selectedIndex = 0;

  segmentItems: SegmentItem[] = [
    { text: 'Stone', id: 'Stone' },
    { text: 'Rick', id: 'Rick' },
    { text: 'Gooey', id: 'Gooey' },
  ];

  separateSegment: SegmentItem = { text: 'Show all', id: 'all' };

  listItems = [
    {
      title: 'Friend Throw',
      count: 4,
      mix: ['Fighter', 'Suplex', 'Beetle', 'Gooey'],
    },
    {
      title: 'Ice Curling',
      count: 3,
      mix: ['Stone', 'Rick', 'Gooey'],
    },
    {
      title: 'Magoloran Launch',
      count: 3,
      mix: ['Anyone (up to 3)'],
    },
    {
      title: 'Thundersplash',
      count: 1,
      mix: ['Plasma'],
    },
    {
      title: 'Rising Sizzler',
      count: 2,
      mix: ['Fire', 'Rick'],
    },
  ];

  get filteredListItems() {
    const filter = this.selectedSegment.id;
    return filter === 'all'
      ? this.listItems
      : this.listItems.filter((item) => item.mix.indexOf(filter) > -1);
  }

  ngOnInit() {
    this.selectedSegment = this.segmentItems[this.selectedIndex];
  }

  onSegmentSelect(selectedSegment: SegmentItem) {
    this.selectedSegment = selectedSegment;
    this.selectedIndex = this.segmentItems.indexOf(selectedSegment);
  }
}
