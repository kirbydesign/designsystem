import { Component } from '@angular/core';
import { ToastConfig, ToastController } from '@kirbydesign/designsystem';

import { BasePageExampleComponent } from '../../page-example/base-page-example.component';

export const config = {
  template: `<kirby-page defaultBackHref="/">
  <kirby-header (titleClick)="onTitleClick($event)" [title]="'Interactive Title'" value="12345,67" valueUnit="USD" subtitle1="Subtitle one" subtitle2="Subtitle two">
    <kirby-icon name="arrow-down" *kirbyHeaderTitleActionIcon></kirby-icon>
  </kirby-header>

  <kirby-page-content>
    <div [innerHTML]="content"></div>
  </kirby-page-content>
</kirby-page>`,
};
@Component({
  template: config.template,
})
export class HeaderWithInteractiveTitleExampleComponent extends BasePageExampleComponent {
  static readonly template = config.template
    .replace(' defaultBackHref="/"', '')
    .replace(' [innerHTML]="content">', '>...');
  static readonly codeSnippet = `onTitleClick(event: PointerEvent) {
  // Maybe do something based on the event target:
  const eventTarget = event.currentTarget as HTMLElement;
  const targetLocation = eventTarget.closest('kirby-header') ? 'Title in header clicked' : 'Title in toolbar clicked';
  // Do something...
}`;

  constructor(private toastController: ToastController) {
    super();
  }

  onTitleClick(event: PointerEvent) {
    const eventTarget = event.currentTarget as HTMLElement;
    const targetLocation = eventTarget.closest('kirby-header') ? 'in header' : 'in toolbar';
    const config: ToastConfig = {
      message: `Title ${targetLocation} clicked...`,
      messageType: 'success',
      durationInMs: 1500,
    };
    this.toastController.showToast(config);
  }
}
