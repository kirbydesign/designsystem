import { Component } from '@angular/core';
import { ToastConfig, ToastController } from '@kirbydesign/designsystem';

import { BasePageExampleComponent } from '../../page-example/base-page-example.component';

const config = {
  template: `<kirby-page defaultBackHref="/">
  <kirby-header [title]="'Custom actions'" subtitle1="Subtitle one" subtitle2="Subtitle two">
    <ng-container *kirbyHeaderActions>
      <kirby-menu>
        <button kirby-button>
          <kirby-icon name="kirby"></kirby-icon>
          <span>Action</span>
        </button>
        <kirby-item [selectable]="true" (click)="actionClicked('Primary Action 1')">
          Primary Action 1
        </kirby-item>
        <kirby-item [selectable]="true" (click)="actionClicked('Primary Action 2')">
          Primary Action 2
        </kirby-item>
      </kirby-menu>

      <kirby-menu>
        <kirby-item [selectable]="true" (click)="actionClicked('Secondary Action 1')">
          Secondary Action 1
        </kirby-item>
        <kirby-item [selectable]="true" (click)="actionClicked('Secondary Action 2')">
          Secondary Action 2
        </kirby-item>
      </kirby-menu>
    </ng-container>
  </kirby-header>

  <kirby-page-content>
    <div [innerHTML]="content"></div>
  </kirby-page-content>
</kirby-page>`,
};
@Component({
  template: config.template,
})
export class HeaderWithCustomActionsExampleComponent extends BasePageExampleComponent {
  document = window.document.body;
  static readonly template = config.template
    .replace(' defaultBackHref="/"', '')
    .replace(' [innerHTML]="content">', '>...');

  constructor(private toastController: ToastController) {
    super();
  }

  actionClicked(action: string) {
    const config: ToastConfig = {
      message: `${action} was selected.`,
      messageType: 'success',
      durationInMs: 1500,
    };
    this.toastController.showToast(config);
  }
}
