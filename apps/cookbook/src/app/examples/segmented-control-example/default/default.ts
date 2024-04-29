import { Component, OnInit } from '@angular/core';

import { SegmentedControlMode, SegmentItem } from '@kirbydesign/designsystem';

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
        name="example-default-mode"
        value="default"
        [checked]="mode === 'default'"
        (change)="setMode($event.target.value)"
      />
      Default
    </label>
    <label>
      <input
        type="radio"
        name="example-default-mode"
        value="chip"
        [checked]="mode === 'chip'"
        (change)="setMode($event.target.value)"
      />
      Chip
    </label>
    <label> 
      <input
        type="radio"
        name="example-default-mode"
        value="compactChip"
        [checked]="mode === 'compactChip'"
        (change)="setMode($event.target.value)"
      />
      Compact Chip
    </label>
  </p>
  <p [class.disabled]="mode !== 'default'">
    <strong>Size:</strong><em class="kirby-text-small-light"> (only applies in 'default' mode)</em><br/>  
    <label>
      <input
        type="radio"
        name="example-default-size"
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
        name="example-default-size"
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

  mode: SegmentedControlMode = SegmentedControlMode.default;

  private _size: 'sm' | 'md' = 'md';
  get size(): 'sm' | 'md' {
    return this.mode === SegmentedControlMode.default ? this._size : 'sm';
  }

  selectedSegment: SegmentItem;

  private defaultItems: SegmentItem[] = [
    {
      text: 'First item',
      id: 'first',
    },
    {
      text: 'Second item',
      id: 'second',
    },
  ];

  private chipItems = [...'123456'].map((i) => ({ text: `Chip-${i}`, id: i }));

  // Showcase compact chips with less chararcters but more chips
  private compactChipItems = [...'12345678'].map((i) => ({ text: `c${i}`, id: i }));

  get items(): SegmentItem[] {
    switch (this.mode) {
      case SegmentedControlMode.default:
        return this.defaultItems;
      case SegmentedControlMode.chip:
        return this.chipItems;
      case SegmentedControlMode.compactChip:
        return this.compactChipItems;
    }
  }

  ngOnInit() {
    this.selectedSegment = this.items[0];
  }

  onSegmentSelect(segment: SegmentItem) {
    console.log('selectedSegment', segment);
    this.selectedSegment = segment;
  }

  setMode(mode: SegmentedControlMode) {
    console.log('setMode - mode:', mode);
    this.mode = mode;
    this.selectedSegment = this.items[0];
  }

  setSize(size: 'sm' | 'md') {
    this._size = size;
  }
}
