import { Component } from '@angular/core';

import { SegmentItem } from '@kirbydesign/designsystem';

const config = {
  template: `<div class="wrapper">
  <kirby-segmented-control
    [items]="segmentItems"
    [value]="selectedSegment"
    [size]="size"
    (segmentSelect)="onSegmentSelect($event)"
  ></kirby-segmented-control>
  <button
    kirby-button
    [size]="size"
    [attentionLevel]="selectedSegment === separateSegment ? '2' : '3'"
    (click)="onSegmentSelect(separateSegment)"
  >
    {{ separateSegment.text }}
  </button>
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
    `:host {
  display: block;
  margin-bottom: 16px;
}`,
  ],

  codeSnippet: `size = 'md';

segmentItems: SegmentItem[] = [
  { text: 'Stone', id: 'Stone' },
  { text: 'Rick', id: 'Rick' },
  { text: 'Gooey', id: 'Gooey' },
];

selectedSegment: this.segmentItems[0];

separateSegment: SegmentItem = { text: 'Show all', id: 'all' };

listItems = [...];

get filteredListItems() {
  const filter = this.selectedSegment.id;
  return filter === 'all'
    ? this.listItems
    : this.listItems.filter((item) => item.mix.indexOf(filter) > -1);
}

onSegmentSelect(segment: SegmentItem) {
  this.selectedSegment = segment;
}`,
};
@Component({
  selector: 'cookbook-segmented-control-example-grouped',
  template: config.template,
  styles: config.styles,
})
export class SegmentedControlExampleGroupedComponent {
  template: string = config.template;
  styles: string =
    "@use '@kirbydesign/core/src/scss/utils';\n\n" +
    config.styles[0].replace('8px;', "utils.size('xxs');").replace('24px;', "utils.size('m');");
  codeSnippet: string = config.codeSnippet;

  size = 'md';

  segmentItems: SegmentItem[] = [
    { text: 'Stone', id: 'Stone' },
    { text: 'Rick', id: 'Rick' },
    { text: 'Gooey', id: 'Gooey' },
  ];

  selectedSegment: SegmentItem = this.segmentItems[0];

  separateSegment: SegmentItem = { text: 'Show all', id: 'all' };

  onSegmentSelect(selectedSegment: SegmentItem) {
    this.selectedSegment = selectedSegment;
  }

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
}
