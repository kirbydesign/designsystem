import { Component } from '@angular/core';
import { ThemeColorDirective } from '@kirbydesign/designsystem/shared';
import { BadgeComponent } from '@kirbydesign/designsystem/badge';

const config = {
  selector: 'cookbook-badge-example-number',
  template: `<kirby-badge>1</kirby-badge>
<kirby-badge themeColor="success">7</kirby-badge>
<kirby-badge themeColor="warning">99</kirby-badge>
<kirby-badge themeColor="danger">123</kirby-badge>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  styleUrls: ['./badge-example-shared.scss'],
  imports: [ThemeColorDirective, BadgeComponent],
})
export class BadgeExampleNumberComponent {
  template: string = config.template;
}
