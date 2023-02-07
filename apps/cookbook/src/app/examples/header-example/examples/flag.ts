import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-header-example-flag',
  template: `
  <kirby-header>
    <kirby-flag *kirbyHeaderFlag themeColor="warning">Warning</kirby-flag>
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
export class HeaderExampleFlagComponent {
  template: string = config.template;
}
