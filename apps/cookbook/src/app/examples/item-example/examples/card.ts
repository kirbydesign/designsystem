import { Component } from '@angular/core';
import { CardModule } from '@kirbydesign/designsystem/card';
import { ItemModule } from '@kirbydesign/designsystem/item';
import { ToggleComponent } from '@kirbydesign/designsystem/toggle';

const config = {
  selector: 'cookbook-item-example-card',
  template: `<kirby-card>
  <kirby-item selectable="true">
    <p class="kirby-item-title">Title</p>
    <kirby-toggle slot="end"></kirby-toggle>
  </kirby-item>
</kirby-card>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  imports: [CardModule, ItemModule, ToggleComponent],
})
export class ItemExampleCardComponent {
  template: string = config.template;
}
