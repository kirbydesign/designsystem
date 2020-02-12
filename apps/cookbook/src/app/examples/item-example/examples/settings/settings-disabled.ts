import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-item-example-settings-disabled',
  template: `<kirby-item disabled>
  <h3>Disabled</h3>
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
