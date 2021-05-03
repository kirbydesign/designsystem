import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-link-example-default',
  template: `<a [routerLink]="'/home/changelog'">Changelog</a>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  styleUrls: ['./link-examples.shared.scss'],
})
export class LinkExampleDefaultComponent {
  template: string = config.template;
}
