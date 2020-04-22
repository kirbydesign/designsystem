import { Component, OnInit } from '@angular/core';

import { SegmentItem } from '@kirbydesign/designsystem';

const config = {
  template: `<kirby-segmented-control
  [mode]="mode"
  [items]="items"
  (segmentSelect)="onSegmentSelect($event)"
></kirby-segmented-control>

<kirby-card hasPadding="true">
  <h2>Content for {{ activeSegment.text }} segment</h2>
  <p>The selected segment has text "{{ activeSegment.text }}" and id "{{ activeSegment.id }}"</p>
</kirby-card>

<fieldset>
  <legend>Segmented Control - mode</legend>
  <label>
    <input
      type="radio"
      name="mode"
      value="default"
      [checked]="mode === 'default'"
      (change)="setMode($event.target.value)"
    />
    Default
  </label>
  <label>
    <input
      type="radio"
      name="mode"
      value="chip"
      [checked]="mode === 'chip'"
      (change)="setMode($event.target.value)"
    />
    Chip
  </label>
</fieldset>
`,
};
@Component({
  selector: 'cookbook-segmented-control-example-default',
  template: config.template,
  styleUrls: ['./default.scss'],
})
export class SegmentedControlExampleDefaultComponent implements OnInit {
  template: string = config.template.split('<fieldset>')[0]; // Remove config part of the template

  mode: 'default' | 'chip' = 'default';
  protected activeSegment: SegmentItem;

  items: SegmentItem[] = this.getSegmentedItems();

  ngOnInit() {
    const checkedSegment = this.items.find((segment) => segment.checked === true);
    this.activeSegment = checkedSegment;
  }

  onSegmentSelect(selectedSegment: SegmentItem) {
    console.log('selectedSegment', selectedSegment);
    this.activeSegment = selectedSegment;
  }

  setMode(mode: 'default' | 'chip') {
    this.mode = mode;
    this.items = this.getSegmentedItems();
    this.activeSegment = this.items[0];
  }

  private getSegmentedItems(): SegmentItem[] {
    let segmentedItems = [];
    if (this.mode === 'chip') {
      segmentedItems.push({ text: 'Chip-1', checked: true, id: '1' });
      // Add additional chips for testing
      Array.from('23456'.split('')).forEach((i: string) => {
        segmentedItems.push({ text: 'Chip-'.concat(i), id: i });
      });
    } else {
      segmentedItems.push({
        text: 'First item',
        checked: true,
        id: 'first',
        badge: {
          content: '4',
          description: '4 unread messages',
          themeColor: 'warning',
        },
      });
      segmentedItems.push({ text: 'Second item', id: 'second' });
    }
    return segmentedItems;
  }
}
