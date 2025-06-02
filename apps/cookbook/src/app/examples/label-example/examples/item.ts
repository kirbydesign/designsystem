import { Component } from '@angular/core';
import { ItemModule } from '@kirbydesign/designsystem/item';
import { BadgeComponent } from '@kirbydesign/designsystem/badge';
import { FlagComponent } from '@kirbydesign/designsystem/flag';
import { AvatarComponent, IconModule } from '@kirbydesign/designsystem';

const config = {
  selector: 'cookbook-label-example-item',
  template: `<kirby-item>
  <kirby-badge slot="outside" themeColor="warning" size="sm"></kirby-badge>
  <kirby-avatar slot="start" themeColor="light">
    <kirby-icon name="person"></kirby-icon>
  </kirby-avatar>
  <kirby-label>
    <p class="kirby-item-title">Title</p>
    <p class="kirby-item-detail">Detail</p>
  </kirby-label>
  <kirby-flag slot="end" themeColor="success">60</kirby-flag>
</kirby-item>`,
  styles: [
    `div[slot="outside"] {
  display: flex;
  flex-direction: column;
}`,
  ],
};

@Component({
  selector: config.selector,
  template: config.template,
  styles: config.styles,
  imports: [ItemModule, BadgeComponent, FlagComponent, AvatarComponent, IconModule],
})
export class LabelExampleItemComponent {
  template: string = config.template;
  styles: string = config.styles[0];
}
