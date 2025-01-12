import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-item-example-picker-checkbox',
  template: `<kirby-item selectable="true">
  <kirby-checkbox slot="start"></kirby-checkbox>
  <kirby-label>
    <p class="kirby-item-title">Title</p>
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
  standalone: false,
})
export class ItemExamplePickerCheckboxComponent {
  template: string = config.template;
}
