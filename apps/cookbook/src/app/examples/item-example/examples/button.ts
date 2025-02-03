import { Component } from '@angular/core';
import { ItemModule } from '@kirbydesign/designsystem/item';
import { ButtonComponent } from '@kirbydesign/designsystem/button';

const config = {
  selector: 'cookbook-item-example-button',
  template: `<kirby-item>
  <kirby-label>
    <p class="kirby-item-title">Title</p>
    <p class="kirby-item-detail">Detail</p>
  </kirby-label>
  <button slot="end" kirby-button size="sm">Small Button</button>
</kirby-item>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  imports: [ItemModule, ButtonComponent],
})
export class ItemExampleButtonComponent {
  template: string = config.template;
}
