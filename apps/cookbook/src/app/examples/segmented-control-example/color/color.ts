import { Component, OnInit } from '@angular/core';

import { SegmentedControlMode, SegmentItem } from '@kirbydesign/designsystem';

const config = {
  template: `<kirby-card hasPadding="true" [themeColor]="color">  
  <kirby-segmented-control
  [items]="items"
  [value]="selectedSegment"
  [mode]="mode"
></kirby-segmented-control>
</kirby-card>
<div class="card-option-button-group">
    <button (click)="setThemeColor('white')" class="white"></button>
    <button (click)="setThemeColor('light')" class="light"></button>
    <button (click)="setThemeColor('secondary')" class="secondary"></button>
    <button (click)="setThemeColor('dark')" class="dark"></button>
</div>

<fieldset>
  <legend>Configuration</legend>
  <p>
    <strong>Mode:</strong><br/>
    <label>
      <input
        type="radio"
        name="example-color-mode"
        value="default"
        [checked]="mode === 'default'"
        (change)="setMode($event.target.value)"
      />
      Default
    </label>
    <label>
      <input
        type="radio"
        name="example-color-mode"
        value="chip"
        [checked]="mode === 'chip'"
        (change)="setMode($event.target.value)"
      />
      Chip
    </label>
    <label> 
      <input
        type="radio"
        name="example-color-mode"
        value="compactChip"
        [checked]="mode === 'compactChip'"
        (change)="setMode($event.target.value)"
      />
      Compact Chip
    </label>
  </p>
</fieldset>`,
};
@Component({
  selector: 'cookbook-segmented-control-example-color',
  template: config.template,
  styleUrls: ['./color.scss'],
})
export class SegmentedControlExampleColorComponent implements OnInit {
  get template(): string {
    return config.template
      .split('<div class="card-option-button-group">')[0] // Remove config part of the template
      .replace('[mode]="mode"', `mode="${this.mode}"`);
  }

  mode: SegmentedControlMode = SegmentedControlMode.default;

  color: string = 'white';

  selectedSegment: SegmentItem;

  private defaultItems: SegmentItem[] = [
    {
      text: 'First Item',
      id: '1',
    },
    {
      text: 'Second Item',
      id: '2',
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

  setMode(mode: SegmentedControlMode) {
    this.mode = mode;
    this.selectedSegment = this.items[0];
  }

  setThemeColor(color: string) {
    this.color = color;
  }
}
