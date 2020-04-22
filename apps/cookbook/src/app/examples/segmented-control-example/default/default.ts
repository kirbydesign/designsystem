import { Component, OnInit } from '@angular/core';

import { SegmentItem } from '@kirbydesign/designsystem';

const config = {
  template: `<kirby-segmented-control
  [items]="items"
  [value]="selectedSegment"
  [mode]="mode"
  [size]="size"
  (segmentSelect)="onSegmentSelect($event)"
></kirby-segmented-control>

<kirby-card hasPadding="true">
  <h2>Content for {{ selectedSegment.text }} segment</h2>
  <p>The selected segment has text "{{ selectedSegment.text }}" and id "{{ selectedSegment.id }}"</p>
</kirby-card>

<fieldset>
  <legend>Configuration</legend>
  <p>
    <strong>Mode:</strong><br/>
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
  </p>
  <p>
    <strong>Size:</strong><em *ngIf="mode === 'chip'"> (only applies to <code>default</code> mode)</em><br/>  
    <label>
      <input
        type="radio"
        name="size"
        value="sm"
        [checked]="size === 'sm'"
        (change)="setSize($event.target.value)"
        [disabled]="mode === 'chip'"
      />
      Small (<code>sm</code>)
    </label>
    <label>
      <input
        type="radio"
        name="size"
        value="md"
        [checked]="size === 'md'"
        (change)="setSize($event.target.value)"
        [disabled]="mode === 'chip'"
      />
      Medium (<code>md</code>) - default
    </label>
    </p>
</fieldset>
`,
  codeSnippet: `onSegmentSelect(segment: SegmentItem) {
  this.selectedSegment = segment;
}`,
};
@Component({
  selector: 'cookbook-segmented-control-example-default',
  template: config.template,
  styleUrls: ['./default.scss'],
})
export class SegmentedControlExampleDefaultComponent implements OnInit {
  get template(): string {
    return config.template
      .split('<fieldset>')[0] // Remove config part of the template
      .replace('[mode]="mode"', `mode="${this.mode}"`)
      .replace('[size]="size"', `size="${this.size}"`);
  }
  codeSnippet = config.codeSnippet;

  mode: 'default' | 'chip' = 'default';
  size: 'sm' | 'md' = 'md';
  selectedSegment: SegmentItem;

  private defaultItems = [
    {
      text: 'First item',
      id: 'first',
      badge: {
        content: '4',
        description: '4 unread messages',
        themeColor: 'warning',
      },
    },
    { text: 'Second item', id: 'second' },
  ];
  private chipItems = [...'123456'].map((i) => ({ text: `Chip-${i}`, id: i }));

  get items(): SegmentItem[] {
    return this.mode === 'default' ? this.defaultItems : this.chipItems;
  }

  ngOnInit() {
    this.selectedSegment = this.items[0];
  }

  onSegmentSelect(segment: SegmentItem) {
    console.log('selectedSegment', segment);
    this.selectedSegment = segment;
  }

  setMode(mode: 'default' | 'chip') {
    this.mode = mode;
    this.selectedSegment = this.items[0];
  }

  setSize(size: 'sm' | 'md') {
    this.size = size;
  }
}
