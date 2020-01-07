import { Component } from '@angular/core';

const config = {
  selector: 'kirby-item-example-simple-normal',
  template: `<kirby-item size="normal">
  <h3>Size</h3>
  <data slot="end">Normal</data>
</kirby-item>`,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class ItemExampleSimpleNormalComponent {
  template: string = config.template;
}
