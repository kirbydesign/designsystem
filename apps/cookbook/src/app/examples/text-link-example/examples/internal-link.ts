import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-text-link-example-internal',
  template: `<kirby-text-link size="xs" link="/home" text="extra small"></kirby-text-link>
<kirby-text-link size="sm" link="/home" text="small"></kirby-text-link>
<kirby-text-link link="/home" text="medium (default)"></kirby-text-link>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  styleUrls: ['./text-link-examples.shared.scss'],
})
export class TextLinkExampleInternalLinkComponent {
  template: string = config.template;
}
