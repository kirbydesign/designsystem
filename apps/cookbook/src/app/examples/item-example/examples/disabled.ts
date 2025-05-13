import { Component } from '@angular/core';
import { ItemModule } from '@kirbydesign/designsystem/item';

const config = {
  selector: 'cookbook-item-example-disabled',
  template: `<kirby-item [selectable]="true" [disabled]="true">
  <p class="kirby-item-title">Disabled Selectable</p>
</kirby-item>

<kirby-item [selectable]="true" [disclosure]="'arrow-more'" [disabled]="true">
  <p class="kirby-item-title">Disabled Selectable with Disclosure</p>
</kirby-item>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  styleUrls: ['./_shared.scss'],
  imports: [ItemModule],
})
export class ItemExampleDisabledComponent {
  template: string = config.template;
}
