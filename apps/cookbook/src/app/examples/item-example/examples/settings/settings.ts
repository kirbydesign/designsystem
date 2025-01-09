import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-item-example-settings',
  template: `<kirby-item>
  <kirby-toggle slot="end" checked="true">
    Title
  </kirby-toggle>
</kirby-item>`,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class ItemExampleSettingsComponent {
  template: string = config.template;
}
