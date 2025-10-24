import { Component } from '@angular/core';
import { MenuComponent } from '@kirbydesign/designsystem/menu';
import { ItemComponent, LabelComponent } from '@kirbydesign/designsystem/item';
import { IconComponent } from '@kirbydesign/designsystem/icon';
import { CheckboxComponent } from '@kirbydesign/designsystem/checkbox';
import { ToggleComponent } from '@kirbydesign/designsystem/toggle';

const config = {
  selector: 'cookbook-menu-advanced-example',
  template: `<kirby-menu [closeOnSelect]="false" aria-label="Advanced items">
  <kirby-item>
    <kirby-icon name="person" slot="start"></kirby-icon>
    <kirby-checkbox slot="end">
      <kirby-label>      
        Friend Throw
      </kirby-label>
    </kirby-checkbox>
  </kirby-item>
  <kirby-item>
    <kirby-icon name="notification" slot="start"></kirby-icon>
    <kirby-checkbox slot="end">
      <kirby-label>      
        Ice Curling
      </kirby-label>
    </kirby-checkbox>
  </kirby-item>
  <kirby-item>
    <kirby-icon name="default" slot="start"></kirby-icon>
    <kirby-toggle slot="end">
      <kirby-label>      
        Allow Cheats
      </kirby-label>
    </kirby-toggle>
  </kirby-item>
</kirby-menu>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  imports: [
    MenuComponent,
    ItemComponent,
    IconComponent,
    CheckboxComponent,
    ToggleComponent,
    LabelComponent,
  ],
})
export class MenuAdvancedExampleComponent {
  template: string = config.template;
}
