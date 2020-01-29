import { Component } from '@angular/core';

const config = {
  selector: 'kirby-item-example-simple-md',
  template: `<kirby-item>
  <h3>Medium (default)</h3>
</kirby-item>`,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class ItemExampleSimpleMediumComponent {
  template: string = config.template;
}
