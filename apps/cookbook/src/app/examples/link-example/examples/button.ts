import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-link-example-button',
  template: `This is a <button class="kirby-button-link">button styled as a link</button>.`,
};

@Component({
  selector: config.selector,
  template: config.template,
  styleUrl: './link-examples.shared.scss',
})
export class LinkExampleButtonComponent {
  template: string = config.template;
}
