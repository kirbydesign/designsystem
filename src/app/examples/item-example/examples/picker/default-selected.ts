import { Component } from '@angular/core';

const config = {
  selector: 'kirby-item-example-picker-default-selected',
  template: `<kirby-item selected="true">
  <kirby-icon name="checkmark-selected" slot="start"></kirby-icon>
  <kirby-label>
    <h3>Title</h3>
    <p subtitle>Subtitle</p>
  </kirby-label>
  <kirby-label slot="end">
    <data>Value</data>
    <data subtitle>Sub detail</data>
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
