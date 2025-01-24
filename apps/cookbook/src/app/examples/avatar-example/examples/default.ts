import { Component } from '@angular/core';
import { AvatarComponent } from '@kirbydesign/designsystem/avatar';

const config = {
  selector: 'cookbook-avatar-example-default',
  template: `<kirby-avatar size="xs" text="A" title="xs"></kirby-avatar>
<kirby-avatar size="sm" text="A" title="sm"></kirby-avatar>
<kirby-avatar size="md" text="A" title="md"></kirby-avatar>
<kirby-avatar size="lg" text="A" title="lg"></kirby-avatar>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  styleUrls: ['./avatar-examples.shared.scss'],
  imports: [AvatarComponent],
})
export class AvatarExampleDefaultComponent {
  template: string = config.template;
}
