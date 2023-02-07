import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-header-example-default',
  template: `
    <kirby-header [titleMaxLines]="2">
      <ng-container *kirbyHeaderTitle>Title</ng-container>
      <ng-container *kirbyHeaderSubtitle1>Subtitle one</ng-container>
      <ng-container *kirbyHeaderSubtitle2>Subtitle two</ng-container>
    </kirby-header>
  `,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class HeaderExampleDefaultComponent {
  template: string = config.template;
}
