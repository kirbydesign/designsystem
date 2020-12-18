import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-text-link-example-external',
  template: `<kirby-text-link size="xs" link="https://angular.io/api/router/RouterLink" text="extra small"></kirby-text-link>
<kirby-text-link size="sm" link="https://angular.io/api/router/RouterLink" text="small"></kirby-text-link>
<kirby-text-link link="https://angular.io/api/router/RouterLink" text="medium (default)"></kirby-text-link>
`,
};

@Component({
  selector: config.selector,
  template: config.template,
  styleUrls: ['./text-link-examples.scss'],
})
export class TextLinkExampleExternalLinkComponent {
  template: string = config.template;
}
