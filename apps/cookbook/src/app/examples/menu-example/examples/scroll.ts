import { Component } from '@angular/core';
import { ToastConfig, ToastController } from '@kirbydesign/designsystem/toast';
import { MenuComponent } from '@kirbydesign/designsystem/menu';
import { ItemComponent } from '@kirbydesign/designsystem/item';

const config = {
  selector: 'cookbook-menu-scroll-example',
  template: `<kirby-menu>
  <kirby-item (click)="actionClicked('Mercury')">
    <p class="kirby-item-title">Mercury</p>
  </kirby-item>
  <kirby-item (click)="actionClicked('Venus')">
    <p class="kirby-item-title">Venus</p>
  </kirby-item>
  <kirby-item (click)="actionClicked('Earth')">
    <p class="kirby-item-title">Earth</p>
  </kirby-item>
    <kirby-item (click)="actionClicked('Mars')">
    <p class="kirby-item-title">Mars</p>
  </kirby-item>  
  <kirby-item (click)="actionClicked('Jupiter')">
    <p class="kirby-item-title">Jupiter</p>
  </kirby-item>  
  <kirby-item (click)="actionClicked('Saturn')">
    <p class="kirby-item-title">Saturn</p>
  </kirby-item>  
  <kirby-item (click)="actionClicked('Uranus')">
    <p class="kirby-item-title">Uranus</p>
  </kirby-item>  
  <kirby-item (click)="actionClicked('Neptune')">
    <p class="kirby-item-title">Neptune</p>
  </kirby-item>  
  <kirby-item (click)="actionClicked('Pluto')">
    <p class="kirby-item-title">Pluto</p>
  </kirby-item>
</kirby-menu>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  imports: [MenuComponent, ItemComponent],
})
export class MenuScrollExampleComponent {
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
