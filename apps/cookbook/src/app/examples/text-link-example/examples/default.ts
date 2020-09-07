import { Component, OnInit } from '@angular/core';

const config = {
  selector: 'cookbook-text-link-example-internal',
  template: `
<kirby-text-link link="/home" text="medium (default)"></kirby-text-link>

<kirby-text-link size="sm" link="/home" text="small"></kirby-text-link>

<kirby-text-link size="xs" link="/home" text="extra small"></kirby-text-link>`,
};

@Component({
  selector: config.selector,
  templateUrl: config.template,
  styleUrls: ['./text-link-examples.scss'],
})
export class TextLinkExampleDefaultComponent {
  template: string = config.template;
}
