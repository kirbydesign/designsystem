import { Component } from '@angular/core';
import { ToastConfig, ToastController } from '@kirbydesign/designsystem/toast';

const config = {
  selector: 'cookbook-menu-selectable-example',
  template: `<kirby-menu>
  <kirby-item (click)="actionClicked('Stone')">
    Stone
  </kirby-item>
  <kirby-item (click)="actionClicked('Rick')">
    Rick
  </kirby-item>
  <kirby-item (click)="actionClicked('Gooey')">
    Gooey
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

  actionClicked(hero: string) {
    const config: ToastConfig = {
      message: `${hero} was selected as your Hero.`,
      messageType: 'success',
      durationInMs: 1500,
    };
    this.toastController.showToast(config);
  }
}
