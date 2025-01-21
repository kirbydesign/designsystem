import { Component } from '@angular/core';
import { ItemModule } from '@kirbydesign/designsystem/item';

const config = {
  selector: 'cookbook-item-example-simple-sm',
  template: `<kirby-item size="sm">
  <p class="kirby-item-title">Small</p>
</kirby-item>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  imports: [ItemModule],
})
export class ItemExampleSimpleSmallComponent {
  template: string = config.template;
}
