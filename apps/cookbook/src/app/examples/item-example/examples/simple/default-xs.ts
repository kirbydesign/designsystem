import { Component } from '@angular/core';
import { ItemModule } from '@kirbydesign/designsystem/item';

const config = {
  selector: 'cookbook-item-example-simple-xs',
  template: `<kirby-item size="xs">
  <p class="kirby-item-title">Extra small</p>
</kirby-item>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  imports: [ItemModule],
})
export class ItemExampleSimpleExtraSmallComponent {
  template: string = config.template;
}
