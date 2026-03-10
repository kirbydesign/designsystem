import { Component } from '@angular/core';
import { ItemComponent } from '@kirbydesign/designsystem/item';
import { ToggleComponent } from '@kirbydesign/designsystem/toggle';

const config = {
  selector: 'cookbook-toggle-item-example',
  template: `<kirby-item>
<kirby-toggle slot="end">Default</kirby-toggle>
</kirby-item>

<kirby-item>
<kirby-toggle slot="end" checked="true" (checkedChange)="onCheckedChange($event)">Checked</kirby-toggle>
</kirby-item>

<kirby-item>
<kirby-toggle slot="end" disabled="true">Disabled</kirby-toggle>
</kirby-item>
`,
};

@Component({
  selector: config.selector,
  template: config.template,
  styleUrls: ['./toggle-examples.shared.scss'],
  imports: [ItemComponent, ToggleComponent],
})
export class ToggleItemExampleComponent {
  template: string = config.template;
}
