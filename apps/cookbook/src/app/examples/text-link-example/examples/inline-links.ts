import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-text-link-example-inline',
  template: `Both <kirby-text-link route="/home" text="internal"></kirby-text-link> and 
  <kirby-text-link route="https://angular.io/api/router/RouterLink" text="external"></kirby-text-link>
  links can be used as inline links in a block of text`,
};

@Component({
  selector: config.selector,
  template: config.template,
  styleUrls: ['./text-link-examples.shared.scss'],
})
export class TextLinkExampleInlineLinksComponent {
  template: string = config.template;
}
