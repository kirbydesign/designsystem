import { Component } from '@angular/core';
import { ItemModule } from '@kirbydesign/designsystem/item';

const config = {
  selector: 'cookbook-item-example-simple',
  template: `<kirby-item>
  <p class="kirby-item-title">Title</p>
  <data slot="end">Value</data>
</kirby-item>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  imports: [ItemModule],
})
export class ItemExampleSimpleComponent {
  template: string = config.template;
}
