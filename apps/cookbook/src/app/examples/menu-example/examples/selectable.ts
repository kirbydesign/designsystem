import { Component } from '@angular/core';
import { ToastConfig, ToastController } from '@kirbydesign/designsystem/toast';

const config = {
  selector: 'cookbook-menu-selectable-example',
  template: `<kirby-menu>
  <kirby-item [selectable]="true" (click)="actionClicked('Action 1')">
    <p class="kirby-item-title">Action 1</p>
  </kirby-item>
  <kirby-item [selectable]="true" (click)="actionClicked('Action 2')">
    <p class="kirby-item-title">Action 2</p>
  </kirby-item>
</kirby-menu>`,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class MenuSelectableExampleComponent {
  template: string = config.template;

  constructor(private toastController: ToastController) {}

  actionClicked(action: string) {
    const config: ToastConfig = {
      message: `${action} was selected.`,
      messageType: 'success',
      durationInMs: 1500,
    };
    this.toastController.showToast(config);
  }
}
