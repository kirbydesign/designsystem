import { Component } from '@angular/core';
import { ButtonComponent, RadioModule } from '@kirbydesign/designsystem';
import { CheckboxComponent } from '@kirbydesign/designsystem/checkbox';
import { ItemModule } from '@kirbydesign/designsystem/item';
import { ToggleComponent } from '@kirbydesign/designsystem/toggle';

const config = {
  selector: 'cookbook-item-example-nested-controls',
  template: `<kirby-item>
  <kirby-checkbox slot="end">Item with Checkbox</kirby-checkbox>
</kirby-item>

<kirby-item>
  <kirby-radio slot="end">Item with Radio</kirby-radio>
</kirby-item>

<kirby-item>
  <kirby-toggle slot="end">Item with Toggle</kirby-toggle>
</kirby-item>

<kirby-item>
  Item with Button
  <button kirby-button attentionLevel="2" slot="end">Button</button>
</kirby-item>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  styleUrls: ['./_shared.scss'],
  imports: [ItemModule, CheckboxComponent, ToggleComponent, RadioModule, ButtonComponent],
})
export class ItemExampleNestedControlsComponent {
  template: string = config.template;
}
