import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-link-example-new-tab',
  template: `<a class="kirby-external-icon" target="_blank" href="https://github.com/kirbydesign/designsystem">Kirby on Github</a>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  styleUrls: ['./link-examples.shared.scss'],
})
export class LinkExampleNewTabComponent {
  template: string = config.template;
}
