import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-item-example-simple-md',
  template: `<kirby-item>
  <p class="kirby-item-title">Medium (default)</p>
</kirby-item>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  standalone: false,
})
export class ItemExampleSimpleMediumComponent {
  template: string = config.template;
}
