import { Component, OnInit, Input, OnChanges } from '@angular/core';

import { SegmentItem } from '@kirbydesign/designsystem';

const config = {
  template: `<kirby-segmented-control
  [mode]="mode"
  [items]="items"
  (segmentSelect)="onSegmentSelect($event)"
></kirby-segmented-control>

<ng-container>
  <div class="segment-data">
    <h2>Content for {{ activeSegment.text }} segment</h2>
    <p>The selected segment has text "{{ activeSegment.text }}" and id "{{ activeSegment.id }}"</p>
  </div>
</ng-container>

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
  selector: 'cookbook-segmented-control-example',
  template: config.template,
  styleUrls: ['./segmented-control-example.component.scss'],
})
export class SegmentedControlExampleComponent implements OnInit {
  template: string = config.template.split('<fieldset>')[0]; // Remove config part of the template

  @Input() mode: 'default' | 'chip';
  activeSegment: SegmentItem;

  items: SegmentItem[] = this.getSegmentedItems();

  ngOnInit() {
    this.mode = 'default';
    const checkedSegment = this.items.find((segment) => segment.checked === true);
    this.activeSegment = checkedSegment;
  }

  // ngOnChanges(_: any): void {
  //   this.items = this.getSegmentedItems();
  //   this.activeSegment = this.items[0];
  // }

  onSegmentSelect(selectedSegment: SegmentItem) {
    this.activeSegment = selectedSegment;
  }

  // onCheckedChange(newState: boolean): void {
  //   this.mode = newState ? 'chip' : 'default';
  //   this.ngOnChanges(null);
  // }

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
