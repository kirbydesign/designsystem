import { Component } from '@angular/core';
import { MenuComponent } from '@kirbydesign/designsystem/menu';
import { ButtonComponent } from '@kirbydesign/designsystem/button';
import { IconModule } from '@kirbydesign/designsystem/icon';
import { ItemModule } from '@kirbydesign/designsystem/item';

const config = {
  selector: 'cookbook-menu-custom-button-example',
  template: `<kirby-menu>
  <button
    kirby-button
    type="button"
    [attentionLevel]="'3'"
  >
    <kirby-icon [name]="'menu-outline'"></kirby-icon>
  </button>
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
  imports: [MenuComponent, ButtonComponent, IconModule, ItemModule],
})
export class MenuCustomButtonExampleComponent {
  template: string = config.template;
}
