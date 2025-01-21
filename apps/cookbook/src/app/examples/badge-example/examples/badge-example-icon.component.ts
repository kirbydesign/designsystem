import { Component } from '@angular/core';
import { ThemeColorDirective } from '@kirbydesign/designsystem/shared';
import { BadgeComponent } from '@kirbydesign/designsystem/badge';
import { IconModule } from '@kirbydesign/designsystem/icon';

const config = {
  selector: 'cookbook-badge-example-icon',
  template: `<kirby-badge>
  <kirby-icon name="attach"></kirby-icon>
</kirby-badge>

<kirby-badge themeColor="success">
  <kirby-icon name="attach"></kirby-icon>
</kirby-badge>

<kirby-badge themeColor="warning">
  <kirby-icon name="attach"></kirby-icon>
</kirby-badge>

<kirby-badge themeColor="danger">
  <kirby-icon name="attach"></kirby-icon>
</kirby-badge>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  styleUrls: ['./badge-example-shared.scss'],
  imports: [ThemeColorDirective, BadgeComponent, IconModule],
})
export class BadgeExampleIconComponent {
  template: string = config.template;
}
