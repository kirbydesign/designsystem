import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-item-example-picker-checkbox',
  template: `<kirby-item selectable="true">
  <kirby-checkbox slot="start"></kirby-checkbox>
  <kirby-label>
    <h3>Title</h3>
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
export class ItemExamplePickerCheckboxComponent {
  template: string = config.template;
}
