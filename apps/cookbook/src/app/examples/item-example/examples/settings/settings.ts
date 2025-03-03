import { Component } from '@angular/core';
import { ItemModule } from '@kirbydesign/designsystem/item';
import { ToggleComponent } from '@kirbydesign/designsystem/toggle';

const config = {
  selector: 'cookbook-item-example-settings',
  template: `<kirby-item>
  <kirby-toggle slot="end" checked="true">
    Title
  </kirby-toggle>
</kirby-item>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  imports: [ItemModule, ToggleComponent],
})
export class ItemExampleSettingsComponent {
  template: string = config.template;
}
