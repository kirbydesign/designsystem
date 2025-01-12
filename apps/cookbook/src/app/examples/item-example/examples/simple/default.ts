import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-item-example-simple',
  template: `<kirby-item>
  <p class="kirby-item-title">Title</p>
  <data slot="end">Value</data>
</kirby-item>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  standalone: false,
})
export class ItemExampleSimpleComponent {
  template: string = config.template;
}
