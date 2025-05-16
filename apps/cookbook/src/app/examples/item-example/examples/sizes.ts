import { Component } from '@angular/core';
import { ItemModule } from '@kirbydesign/designsystem/item';

const config = {
  selector: 'cookbook-item-example-sizes',
  template: `<kirby-item>
  <p class="kirby-item-title">Medium (default)</p>
</kirby-item>
<kirby-item size="sm">
  <p class="kirby-item-title">Small</p>
</kirby-item>
  <kirby-item size="xs">
  <p class="kirby-item-title">Extra small</p>
</kirby-item>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  styleUrl: './_shared.scss',
  imports: [ItemModule],
})
export class ItemExampleSizesComponent {
  template: string = config.template;
}
