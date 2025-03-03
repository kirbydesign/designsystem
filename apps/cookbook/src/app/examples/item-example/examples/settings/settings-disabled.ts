import { Component } from '@angular/core';
import { ItemModule } from '@kirbydesign/designsystem/item';
import { ToggleComponent } from '@kirbydesign/designsystem/toggle';

const config = {
  selector: 'cookbook-item-example-settings-disabled',
  template: `<kirby-item disabled>
  <p class="kirby-item-title">Disabled</p>
  <kirby-toggle slot="end"></kirby-toggle>
</kirby-item>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  imports: [ItemModule, ToggleComponent],
})
export class ItemExampleSettingsDisabledComponent {
  template: string = config.template;
}
