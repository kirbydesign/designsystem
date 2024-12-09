import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-item-example-simple-sm',
  template: `<kirby-item size="sm">
  <p class="kirby-item-title">Small</p>
</kirby-item>`,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class ItemExampleSimpleSmallComponent {
  template: string = config.template;
}
