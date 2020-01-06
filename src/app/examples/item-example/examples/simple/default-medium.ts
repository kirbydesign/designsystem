import { Component } from '@angular/core';

const config = {
  selector: 'kirby-item-example-simple-medium',
  template: `<kirby-item [size]="md">
  <h3>Title</h3>
  <data slot="end">Value</data>
</kirby-item>`,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class ItemExampleSimpleMediumComponent {
  template: string = config.template;
}
