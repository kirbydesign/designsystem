import { Component } from '@angular/core';

const config = {
  selector: 'kirby-item-example-settings-disabled',
  template: `<kirby-item disabled>
  <kirby-label>
    <h3>Disabled</h3>
  </kirby-label>
  <kirby-toggle slot="end"></kirby-toggle>
</kirby-item>`,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class ItemExampleSettingsDisabledComponent {
  template: string = config.template;
}
