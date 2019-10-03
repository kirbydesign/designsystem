import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BasePageExampleComponent } from '../base-page-example.component';

const config = {
  template: `<kirby-page title="Centered Title" titleAlignment="center" toolbarTitle="A Different Title" defaultBackHref="/">
  <kirby-page-content>
    <div [innerHTML]="content"></div>
  </kirby-page-content>
</kirby-page>`,
};
@Component({
  template: config.template,
  styleUrls: ['../base-page-example.component.scss'],
})
export class PageAlignmentAndToolbarTitleExampleComponent extends BasePageExampleComponent {
  static readonly template = config.template.replace(' defaultBackHref="/"', '');

  constructor(route: ActivatedRoute) {
    super(route);
  }
}
