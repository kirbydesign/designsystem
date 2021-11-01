import { Component } from '@angular/core';

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
})
export class BadgeExampleNumberComponent {
  template: string = config.template;
}
