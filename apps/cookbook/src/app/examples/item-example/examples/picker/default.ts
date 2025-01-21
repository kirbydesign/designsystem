import { Component } from '@angular/core';
import { ItemModule } from '@kirbydesign/designsystem/item';

const config = {
  selector: 'cookbook-item-example-picker-default',
  template: `<kirby-item selectable="true">
  <kirby-label>
    <p class="kirby-text-normal-bold">Title</p>
    <p class="kirby-item-detail">Detail</p>
  </kirby-label>
  <kirby-label slot="end">
    <data>Value</data>
    <data class="kirby-item-detail">Detail</data>
  </kirby-label>
</kirby-item>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  imports: [ItemModule],
})
export class ItemExamplePickerDefaultComponent {
  template: string = config.template;
}
