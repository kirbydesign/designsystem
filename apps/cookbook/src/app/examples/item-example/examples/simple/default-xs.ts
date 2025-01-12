import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-item-example-simple-xs',
  template: `<kirby-item size="xs">
  <p class="kirby-item-title">Extra small</p>
</kirby-item>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  standalone: false,
})
export class ItemExampleSimpleExtraSmallComponent {
  template: string = config.template;
}
