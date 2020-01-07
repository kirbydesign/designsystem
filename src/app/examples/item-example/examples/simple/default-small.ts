import { Component } from '@angular/core';

const config = {
  selector: 'kirby-item-example-simple-small',
  template: `<kirby-item size="small">
  <h3>Size</h3>
  <data slot="end">Small</data>
</kirby-item>`,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class ItemExampleSimpleSmallComponent {
  template: string = config.template;
}
