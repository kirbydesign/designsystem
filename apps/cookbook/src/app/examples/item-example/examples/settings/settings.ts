import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-item-example-settings',
  template: `<kirby-item>
  <p class="kirby-item-title">Title</p>
  <kirby-toggle slot="end" checked="true"></kirby-toggle>
</kirby-item>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  standalone: false,
})
export class ItemExampleSettingsComponent {
  template: string = config.template;
}
