import { Component } from '@angular/core';
import { AvatarComponent } from '@kirbydesign/designsystem/avatar';
import { IconComponent } from '@kirbydesign/designsystem/icon';
import { ThemeColorDirective } from '@kirbydesign/designsystem/shared';
import { BadgeComponent } from '@kirbydesign/designsystem/badge';

const config = {
  selector: 'cookbook-avatar-example-badge',
  template: `<kirby-avatar size="xs">
  <kirby-icon name="kirby"></kirby-icon>
  <kirby-badge>
    <kirby-icon name="attach"></kirby-icon>
  </kirby-badge>
</kirby-avatar>

<kirby-avatar size="sm">
  <kirby-icon name="kirby"></kirby-icon>
  <kirby-badge>
    <kirby-icon name="attach"></kirby-icon>
  </kirby-badge>
</kirby-avatar>

<kirby-avatar size="md">
  <kirby-icon name="kirby"></kirby-icon>
  <kirby-badge>
    <kirby-icon name="attach"></kirby-icon>
  </kirby-badge>
</kirby-avatar>

<kirby-avatar size="lg">
  <kirby-icon name="kirby"></kirby-icon>
  <kirby-badge>
    <kirby-icon name="attach"></kirby-icon>
  </kirby-badge>
</kirby-avatar>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  styleUrls: ['./badge.scss'],
  imports: [AvatarComponent, IconComponent, ThemeColorDirective, BadgeComponent],
})
export class AvatarExampleBadgeComponent {
  template: string = config.template;
}
