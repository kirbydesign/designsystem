import { Component } from '@angular/core';
import { ItemModule } from '@kirbydesign/designsystem/item';

const config = {
  selector: 'cookbook-item-example-simple-md',
  template: `<kirby-item>
  <p class="kirby-item-title">Medium (default)</p>
</kirby-item>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  imports: [ItemModule],
})
export class ItemExampleSimpleMediumComponent {
  template: string = config.template;
}
