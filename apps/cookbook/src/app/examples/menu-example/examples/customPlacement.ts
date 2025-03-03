import { Component } from '@angular/core';
import { MenuComponent } from '@kirbydesign/designsystem/menu';
import { ItemModule } from '@kirbydesign/designsystem/item';

const config = {
  selector: 'cookbook-menu-custom-placement-example',
  template: `<kirby-menu [placement]="'bottom-end'">
  <kirby-item>
    <p class="kirby-item-title">Stone</p>
  </kirby-item>
  <kirby-item>
    <p class="kirby-item-title">Rick</p>
  </kirby-item>
  <kirby-item>
    <p class="kirby-item-title">Gooey</p>
  </kirby-item>
</kirby-menu>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  imports: [MenuComponent, ItemModule],
})
export class MenuCustomPlacementExampleComponent {
  template: string = config.template;
}
