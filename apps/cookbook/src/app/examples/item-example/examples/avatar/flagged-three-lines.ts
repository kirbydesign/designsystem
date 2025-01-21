import { Component } from '@angular/core';
import { ItemModule } from '@kirbydesign/designsystem/item';
import { ThemeColorDirective } from '@kirbydesign/designsystem/shared';
import { BadgeComponent } from '@kirbydesign/designsystem/badge';
import { AvatarComponent } from '@kirbydesign/designsystem/avatar';
import { IconModule } from '@kirbydesign/designsystem/icon';

const config = {
  selector: 'cookbook-item-example-avatar-flagged-three-lines',
  template: `<kirby-item>
  <div slot="outside">
    <kirby-badge themeColor="success" size="sm"></kirby-badge>
    <kirby-badge themeColor="warning" size="sm"></kirby-badge>
  </div>
  <kirby-avatar overlay="true" slot="start">
    <kirby-icon name="moneybag"></kirby-icon>
  </kirby-avatar>
  <kirby-label>
    <p class="kirby-item-title">Jake The Snake Insurance</p>
    <p class="kirby-item-subtitle">Basic Insurance</p>
    <p class="kirby-item-detail">Account - Budget Account</p>
  </kirby-label>
  <data slot="end" class="kirby-text-bold" value="value">Value</data>
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
  imports: [ItemModule, ThemeColorDirective, BadgeComponent, AvatarComponent, IconModule],
})
export class ItemExampleAvatarFlaggedThreeLinesComponent {
  template: string = config.template;
  styles: string = config.styles[0];
}
