import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-item-example-picker-default-selected',
  template: `<kirby-item selectable="true" selected="true">
  <kirby-icon name="checkmark-selected" slot="start"></kirby-icon>
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
export class ItemExamplePickerDefaultSelectedComponent {
  template: string = config.template;
}
