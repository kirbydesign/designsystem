import { Component } from '@angular/core';
import { ItemModule } from '@kirbydesign/designsystem/item';
import { AvatarComponent } from '@kirbydesign/designsystem/avatar';
import { IconModule } from '@kirbydesign/designsystem/icon';
import { FlagComponent } from '@kirbydesign/designsystem/flag';

const config = {
  selector: 'cookbook-item-example-disclosure',
  template: `<kirby-item selectable="true" [disclosure]="'arrow-more'">
    <kirby-avatar overlay="true" slot="start">
        <kirby-icon name="moneybag"></kirby-icon>
    </kirby-avatar>
  <p class="kirby-item-title">Title</p>
    <kirby-flag slot="end" themeColor="success">
        <data value="60.0">60</data>
    </kirby-flag>
  </kirby-item>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  imports: [ItemModule, AvatarComponent, IconModule, FlagComponent],
})
export class ItemExampleDisclosureComponent {
  template: string = config.template;
}
