import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-item-example-picker-avatar-selected',
  template: `<kirby-item selectable="true" selected="true">
  <kirby-avatar overlay="true" slot="start">
    <kirby-icon name="moneybag"></kirby-icon>
  </kirby-avatar>
  <h3>Title</h3>
  <kirby-icon slot="end" name="checkmark-selected"></kirby-icon>
</kirby-item>`,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class ItemExamplePickerAvatarSelectedComponent {
  template: string = config.template;
}
