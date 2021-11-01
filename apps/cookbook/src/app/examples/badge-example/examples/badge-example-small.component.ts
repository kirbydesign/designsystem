import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-badge-example-small',
  template: `<kirby-badge size="sm">
</kirby-badge>

<kirby-badge themeColor="success" size ="sm">
</kirby-badge>

<kirby-badge themeColor="warning" size="sm">
</kirby-badge>

<kirby-badge themeColor="danger" size="sm">
</kirby-badge>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  styleUrls: ['./badge-example-shared.scss'],
})
export class BadgeExampleSmallComponent {
  template: string = config.template;
}
