import { Component } from '@angular/core';

import { PageModule } from '@kirbydesign/designsystem/page';
import { BasePageExampleComponent } from '../base-page-example.component';

const config = {
  template: `<kirby-page
  titleAlignment="center"
  title="Centered Title"
  subtitle="Centered Subtitle"
  toolbarTitle="A Different Title" defaultBackHref="/">
  <kirby-page-content>
    <div [innerHTML]="content"></div>
  </kirby-page-content>
</kirby-page>`,
};
@Component({
  template: config.template,
  imports: [PageModule],
})
export class PageAlignmentAndToolbarTitleExampleComponent extends BasePageExampleComponent {
  static readonly template = config.template
    .replace(' defaultBackHref="/"', '')
    .replace('<div [innerHTML]="content"></div>', '...');

  constructor() {
    super();
  }
}
