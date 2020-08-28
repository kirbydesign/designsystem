import { Component, OnInit } from '@angular/core';

const config = {
  selector: 'cookbook-text-link-example-icon',
  template: `
<kirby-text-link link="https://angular.io/api/router/RouterLink" text="default"></kirby-text-link>

<kirby-text-link size="sm" link="https://angular.io/api/router/RouterLink" text="small"></kirby-text-link>

<kirby-text-link size="xs" link="https://angular.io/api/router/RouterLink" text="extra small"></kirby-text-link>`,
};

@Component({
  selector: config.selector,
  templateUrl: config.template,
  styleUrls: ['./text-link-examples.scss'],
})
export class TextLinkExampleIconComponent {
  template: string = config.template;
}
