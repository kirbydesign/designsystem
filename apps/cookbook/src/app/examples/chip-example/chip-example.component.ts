import { Component, Input } from '@angular/core';

import { ThemeColor } from '@kirbydesign/designsystem';

const config = {
  template: `<kirby-card hasPadding="true" [themeColor]="themeColor">
  <kirby-chip
    text="kirby"
    (click)="onChipSelect(0)"
    [isSelected]="selectedIndex === 0"
  ></kirby-chip>
  <kirby-chip
    text="kirby"
    (click)="onChipSelect(1)"
    [isSelected]="selectedIndex === 1"
  ></kirby-chip>
</kirby-card>`,
};

@Component({
  selector: 'cookbook-chip-example',
  template: config.template,
  styleUrls: ['./chip-example.component.scss'],
})
export class ChipExampleComponent {
  template: string = config.template;

  selectedIndex = 0;
  @Input() themeColor: ThemeColor | '' = '';

  onChipSelect(index: number) {
    this.selectedIndex = index;
  }
}
