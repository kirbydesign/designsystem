import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-link-example-internal',
  template: `<a [routerLink]="'/home/changelog'">Internal</a>`,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class LinkExampleInternalComponent {
  template: string = config.template;
}
