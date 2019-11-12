import { Component } from '@angular/core';

const config = {
  selector: 'kirby-item-example-picker-avatar-selected',
  template: `<kirby-item selected="true">
  <kirby-avatar overlay="true" slot="start">
    <kirby-icon name="moneybag"></kirby-icon>
  </kirby-avatar>
  <kirby-label>
    <h3>Title</h3>
  </kirby-label>
  <kirby-icon name="checkmark-selected" slot="end"></kirby-icon>
</kirby-item>`,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class ItemExamplePickerAvatarSelectedComponent {
  template: string = config.template;
}
