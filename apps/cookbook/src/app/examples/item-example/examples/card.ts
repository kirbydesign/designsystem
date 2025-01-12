import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-item-example-card',
  template: `<kirby-card>
  <kirby-item selectable="true">
    <p class="kirby-item-title">Title</p>
    <kirby-toggle slot="end"></kirby-toggle>
  </kirby-item>
</kirby-card>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  standalone: false,
})
export class ItemExampleCardComponent {
  template: string = config.template;
}
