import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-item-example-simple-sm',
  template: `<kirby-item size="sm">
  <h3>Small</h3>
</kirby-item>`,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class ItemExampleSimpleSmallComponent {
  template: string = config.template;
}
