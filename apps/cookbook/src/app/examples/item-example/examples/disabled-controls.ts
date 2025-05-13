import { Component } from '@angular/core';
import { ItemModule } from '@kirbydesign/designsystem/item';
import { CheckboxComponent } from '@kirbydesign/designsystem/checkbox';
import { ButtonComponent } from '@kirbydesign/designsystem/button';
import { RadioModule } from '@kirbydesign/designsystem/radio';
import { ToggleComponent } from '@kirbydesign/designsystem/toggle';

const config = {
  selector: 'cookbook-item-example-disabled-controls',
  template: `<kirby-item>
  <kirby-checkbox [disabled]="true" slot="end">Item with Checkbox</kirby-checkbox>
</kirby-item>

<kirby-item>
  <kirby-radio [disabled]="true" slot="end">Item with Radio</kirby-radio>
</kirby-item>

<kirby-item>
  <kirby-toggle [disabled]="true" slot="end">Item with Toggle</kirby-toggle>
</kirby-item>

<kirby-item>
  Item with Button
  <button kirby-button [disabled]="true" attentionLevel="2" slot="end">Button</button>
</kirby-item>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  styleUrls: ['./_shared.scss'],
  imports: [ItemModule, CheckboxComponent, RadioModule, ToggleComponent, ButtonComponent],
})
export class ItemExampleDisabledControlsComponent {
  template: string = config.template;
}
