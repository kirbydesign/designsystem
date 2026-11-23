import { Component } from '@angular/core';

import { CardComponent, CardVariant } from '@kirbydesign/designsystem/card';
import { SegmentedControlComponent } from '@kirbydesign/designsystem/segmented-control';
import { SegmentedControlExampleBaseComponent } from '../segmented-control-example-base';

const config = {
  template: `<kirby-card hasPadding="true" [variant]="variant">  
  <kirby-segmented-control
  [items]="items"
  [value]="selectedSegment"
></kirby-segmented-control>
</kirby-card>
<div class="card-option-button-group">
    <button (click)="setVariant('base')" class="kirby-surface-base" aria-label="Base"></button>
    <button (click)="setVariant('raised')" class="kirby-surface-raised" aria-label="Raised"></button>
    <button (click)="setVariant('brand')" class="kirby-surface-brand" aria-label="Brand"></button>
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

  variant: CardVariant = 'brand';

  setVariant(variant: CardVariant) {
    this.variant = variant;
  }
}
