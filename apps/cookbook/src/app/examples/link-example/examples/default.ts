import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-link-example-default',
  template: `<a class="kirby-text-xsmall" [routerLink]="'/home/changelog'">Extra small</a>
<a class="kirby-text-small" [routerLink]="'/home/changelog'">Small</a>
<a [routerLink]="'/home/changelog'">Normal (default)</a>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  styleUrls: ['./link-examples.shared.scss'],
})
export class LinkExampleDefaultComponent {
  template: string = config.template;
}
