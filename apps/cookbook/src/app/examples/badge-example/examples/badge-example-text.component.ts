import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-badge-example-text',
  template: `<kirby-badge>Default</kirby-badge>
<kirby-badge themeColor="success">Success</kirby-badge>
<kirby-badge themeColor="warning">Warning</kirby-badge>
<kirby-badge themeColor="danger">Danger</kirby-badge>
`,
};

@Component({
  selector: config.selector,
  template: config.template,
  styleUrls: ['./badge-example-shared.scss'],
})
export class BadgeExampleTextComponent {
  template: string = config.template;
}
