import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-item-example-picker-default',
  template: `<kirby-item selectable="true">
  <kirby-label>
    <h3 class="kirby-text-bold">Title</h3>
    <p detail>Detail</p>
  </kirby-label>
  <kirby-label slot="end">
    <data>Value</data>
    <data detail>Detail</data>
  </kirby-label>
</kirby-item>`,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class ItemExamplePickerDefaultComponent {
  template: string = config.template;
}
