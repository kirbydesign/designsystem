import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-item-example-simple',
  template: `<kirby-item>
  <h3>Title</h3>
  <data slot="end">Value</data>
</kirby-item>`,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class ItemExampleSimpleComponent {
  template: string = config.template;
}
