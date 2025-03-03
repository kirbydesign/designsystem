import { Component } from '@angular/core';
import { ToastConfig, ToastController } from '@kirbydesign/designsystem/toast';
import { MenuComponent } from '@kirbydesign/designsystem/menu';
import { ItemModule } from '@kirbydesign/designsystem/item';

const config = {
  selector: 'cookbook-menu-selectable-example',
  template: `<kirby-menu>
  <kirby-item (click)="actionClicked('Stone')">
    <p class="kirby-item-title">Stone</p>
  </kirby-item>
  <kirby-item (click)="actionClicked('Rick')">
    <p class="kirby-item-title">Rick</p>
  </kirby-item>
  <kirby-item (click)="actionClicked('Gooey')">
    <p class="kirby-item-title">Gooey</p>
  </kirby-item>
</kirby-menu>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  imports: [MenuComponent, ItemModule],
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
