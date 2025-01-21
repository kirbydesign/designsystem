import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

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
  imports: [RouterLink],
})
export class LinkExampleDefaultComponent {
  template: string = config.template;
}
