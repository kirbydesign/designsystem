import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-button-example-link',
  template: `<a kirby-button href="/">Link</a>
<a kirby-button href="/" target="_blank">Link (new tab/window)</a>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  styleUrl: './_grid-layout.scss',
})
export class ButtonExampleLinkComponent {
  template: string = config.template;
}
