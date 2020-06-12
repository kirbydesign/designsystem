import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-avatar-example-icon',
  template: `<kirby-avatar size="xs">
  <kirby-icon name="kirby"></kirby-icon>
</kirby-avatar>

<kirby-avatar size="sm">
  <kirby-icon name="kirby"></kirby-icon>
</kirby-avatar>

<kirby-avatar size="md">
  <kirby-icon name="kirby"></kirby-icon>
</kirby-avatar>

<kirby-avatar size="lg">
  <kirby-icon name="kirby"></kirby-icon>
</kirby-avatar>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  styleUrls: ['./avatar-examples.shared.scss'],
})
export class AvatarExampleIconComponent {
  template: string = config.template;
}
