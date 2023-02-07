import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-header-example-value',
  template: `
  <kirby-header>
    <ng-container *kirbyHeaderTitle>Title</ng-container>
    <ng-container *kirbyHeaderValue>12.345,67</ng-container>
    <ng-container *kirbyHeaderSubtitle1>Subtitle one</ng-container>
    <ng-container *kirbyHeaderSubtitle2>Subtitle two</ng-container>
  </kirby-header>
  `,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class HeaderExampleValueComponent {
  template: string = config.template;
}
