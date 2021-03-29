import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-text-link-example-external',
  template: `<kirby-text-link size="xs" route="https://angular.io/api/router/RouterLink" text="extra small"></kirby-text-link>
<kirby-text-link size="sm" route="https://angular.io/api/router/RouterLink" text="small"></kirby-text-link>
<kirby-text-link route="https://angular.io/api/router/RouterLink" text="medium (default)"></kirby-text-link>
`,
};

@Component({
  selector: config.selector,
  template: config.template,
  styleUrls: ['./text-link-examples.shared.scss'],
})
export class TextLinkExampleExternalLinkComponent {
  template: string = config.template;
}
