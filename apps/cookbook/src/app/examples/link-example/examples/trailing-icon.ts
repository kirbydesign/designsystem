import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-link-example-trailing-icon',
  template: `<a class="kirby-help-decorator-icon" target="_blank" href="https://github.com/kirbydesign/designsystem">Trailing icon</a>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  styleUrls: ['./link-examples.shared.scss'],
})
export class LinkExampleTrailingIconComponent {
  template: string = config.template;
}
