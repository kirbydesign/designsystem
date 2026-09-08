import { Component } from '@angular/core';

import { CardComponent } from '@kirbydesign/designsystem/card';
import { SegmentedControlComponent } from '@kirbydesign/designsystem/segmented-control';
import { SegmentedControlExampleBaseComponent } from '../segmented-control-example-base';

const config = {
  template: `<kirby-card hasPadding="true" [themeColor]="color">  
  <kirby-segmented-control
  [items]="items"
  [value]="selectedSegment"
></kirby-segmented-control>
</kirby-card>
<div class="card-option-button-group">
    <button (click)="setThemeColor('white')" class="white"></button>
    <button (click)="setThemeColor('light')" class="light"></button>
    <button (click)="setThemeColor('secondary')" class="secondary"></button>
    <button (click)="setThemeColor('dark')" class="dark"></button>
</div>`,
};
@Component({
  selector: 'cookbook-segmented-control-example-color',
  template: config.template,
  styleUrls: ['./color.scss'],
  imports: [CardComponent, SegmentedControlComponent],
})
export class SegmentedControlExampleColorComponent extends SegmentedControlExampleBaseComponent {
  template = config.template.split('<div class="card-option-button-group">')[0]; // Remove config part of the template

  color: string = 'secondary';

  setThemeColor(color: string) {
    this.color = color;
  }
}
