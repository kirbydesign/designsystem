import { Component } from '@angular/core';

const config = {
  selector: 'kirby-item-example-simple-xs',
  template: `<kirby-item size="xs">
  <h3>Extra small</h3>
</kirby-item>`,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class ItemExampleSimpleExtraSmallComponent {
  template: string = config.template;
}
