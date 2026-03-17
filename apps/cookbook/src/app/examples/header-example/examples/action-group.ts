import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastConfig, ToastController } from '@kirbydesign/designsystem';

import { PageComponent, PageContentComponent } from '@kirbydesign/designsystem/page';
import { HeaderActionsDirective, HeaderComponent } from '@kirbydesign/designsystem/header';
import { ActionGroupComponent } from '@kirbydesign/designsystem/action-group';
import { ButtonComponent } from '@kirbydesign/designsystem/button';
import { IconComponent } from '@kirbydesign/designsystem/icon';
import { BasePageExampleComponent } from '../../page-example/base-page-example.component';

const config = {
  template: `<kirby-page defaultBackHref="/">
  <kirby-header [title]="'Action Grousdadsadsaa sadadawewwp'" subtitle1="Subtitle one" subtitle2="Subtitle two">
    <kirby-action-group *kirbyHeaderActions>
      <button kirby-button attentionLevel="3" (click)="actionClicked('Action 1')">
        <kirby-icon name="edit"></kirby-icon>
        <span class="text">Action 1</span>
      </button>
      <button kirby-button attentionLevel="3" (click)="actionClicked('Action 2')">
        Action 2
      </button>
      <button kirby-button attentionLevel="3" (click)="actionClicked('Action 3')">
        Action 3
      </button>
      @if (showDelayedAction) {
        <button kirby-button attentionLevel="3" (click)="actionClicked('Action 4')">
          Action 4
        </button>
      }
    </kirby-action-group>
  </kirby-header>

  <kirby-page-content>
    <div [innerHTML]="content"></div>
  </kirby-page-content>
</kirby-page>`,
};
@Component({
  template: config.template,
  imports: [
    PageComponent,
    HeaderComponent,
    ActionGroupComponent,
    ButtonComponent,
    IconComponent,
    PageContentComponent,
    HeaderActionsDirective,
  ],
})
export class HeaderWithActionGroupExampleComponent
  extends BasePageExampleComponent
  implements OnInit, OnDestroy
{
  static readonly template = config.template
    .replace(' defaultBackHref="/"', '')
    .replace(' [innerHTML]="content">', '>...');

  showDelayedAction = false;
  private delayedActionTimer?: ReturnType<typeof setTimeout>;

  constructor(private readonly toastController: ToastController) {
    super();
  }

  ngOnInit(): void {
    this.delayedActionTimer = setTimeout(() => {
      this.showDelayedAction = true;
    }, 2000);
  }

  ngOnDestroy(): void {
    if (this.delayedActionTimer) {
      clearTimeout(this.delayedActionTimer);
    }
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
