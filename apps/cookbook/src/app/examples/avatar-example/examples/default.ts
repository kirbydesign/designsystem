import { Component } from '@angular/core';
import { AvatarComponent } from '@kirbydesign/designsystem/avatar';
import { IconComponent } from '@kirbydesign/designsystem/icon';

const config = {
  selector: 'cookbook-avatar-example-default',
  template: `<kirby-avatar>
  <kirby-icon name="kirby"></kirby-icon>
</kirby-avatar>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  styleUrls: ['./avatar-examples.shared.scss'],
  imports: [AvatarComponent, IconComponent],
})
export class AvatarExampleDefaultComponent {
  template: string = config.template;
}
