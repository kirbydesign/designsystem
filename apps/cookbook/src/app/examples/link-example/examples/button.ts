import { Component } from '@angular/core';
import { LinkComponent } from '@kirbydesign/designsystem/link';

const config = {
  selector: 'cookbook-link-example-button',
  template: `This is a <button kirby-link>button styled as a link</button>.`,
};

@Component({
  selector: config.selector,
  template: config.template,
  styleUrl: './link-examples.shared.scss',
  imports: [LinkComponent],
})
export class LinkExampleButtonComponent {
  template: string = config.template;
}
