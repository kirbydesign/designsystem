import { Component } from '@angular/core';

import { BasePageExampleComponent } from '../base-page-example.component';

const config = {
  template: `<kirby-page title="Title1" defaultBackHref="/">
  <!-- Custom Page Header -->
  <kirby-header *kirbyPageHeader> [titleMaxLines]="2">
    <ng-container *kirbyHeaderTitle><div >Title</div></ng-container>
    <ng-container *kirbyHeaderSubtitle1>Subtitle one</ng-container>
    <ng-container *kirbyHeaderSubtitle2>Subtitle two</ng-container>
  </kirby-header>
  <kirby-page-content>
    <div [innerHTML]="content"></div>
  </kirby-page-content>
</kirby-page>`,
};
@Component({
  template: config.template,
})
export class PageSimpleExampleComponent extends BasePageExampleComponent {
  static readonly template = config.template
    .replace(' defaultBackHref="/"', '')
    .replace('<div [innerHTML]="content"></div>', '...');
}
