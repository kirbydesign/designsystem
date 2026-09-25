import { Component } from '@angular/core';
import { InputComponent } from '@kirbydesign/designsystem/form-field';
import { ItemComponent } from '@kirbydesign/designsystem/item';
import { CardComponent } from '@kirbydesign/designsystem/card';
import { DividerComponent } from '@kirbydesign/designsystem/divider';

const config = {
  selector: 'cookbook-item-example-with-input',
  template: `<kirby-card>
  <kirby-item>
    Item with medium size input
    <input kirby-input slot="end" size="md" placeholder="Input in end slot">
  </kirby-item>
</kirby-card>
<kirby-card>
  <kirby-item>
    Item with large (default) size input
    <input kirby-input slot="end" placeholder="Input in end slot">
  </kirby-item>
</kirby-card>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  styleUrls: ['./_shared.scss'],
  imports: [ItemComponent, InputComponent, CardComponent, DividerComponent],
})
export class ItemExampleWithInputComponent {
  template: string = config.template;
}
