import { Component } from '@angular/core';
import { ItemComponent } from '@kirbydesign/designsystem/item';
import { ToggleComponent } from '@kirbydesign/designsystem/toggle';

const config = {
  selector: 'cookbook-toggle-default-example',
  template: `
  <div class="container-wrapper">
  <kirby-item>
    <p class="kirby-item-title">Default</p>
  <kirby-toggle slot="end"></kirby-toggle>
 </kirby-item>

<kirby-item>
    <p class="kirby-item-title">Checked</p> 
    <kirby-toggle checked="true" (checkedChange)="onCheckedChange($event)" slot="end"></kirby-toggle>
</kirby-item>

<kirby-item>
    <p class="kirby-item-title">Disabled</p> 
    <kirby-toggle disabled="true" slot="end"></kirby-toggle>
</kirby-item>
</div>
`,
};

@Component({
  selector: config.selector,
  styleUrls: ['./toggle-examples.shared.scss'],
  template: config.template,
  imports: [ToggleComponent, ItemComponent],
})
export class ToggleDefaultExampleComponent {
  template = config.template;

  onCheckedChange(checked: boolean) {
    console.log(`Toggle onCheckedChange: ${checked}`);
  }
}
