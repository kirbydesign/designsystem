import { Component } from '@angular/core';
import { ItemComponent } from '@kirbydesign/designsystem/item';

const config = {
  selector: 'cookbook-item-example-selectable',
  template: `
  <kirby-item [selectable]="true">
  <p class="kirby-item-title">Selectable</p>
</kirby-item>

<kirby-item [selectable]="true" disclosure="arrow-more">
  <p class="kirby-item-title">Selectable with disclosure</p>
</kirby-item>

<kirby-item href="https://github.com/kirbydesign/designsystem" disclosure="link" target="_blank">
  <p class="kirby-item-title">Link with disclosure</p>
</kirby-item>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  styleUrls: ['./_shared.scss'],
  imports: [ItemComponent],
})
export class ItemExampleSelectableComponent {
  template: string = config.template;
}
