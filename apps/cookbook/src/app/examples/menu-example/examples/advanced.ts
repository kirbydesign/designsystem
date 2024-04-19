import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-menu-advanced-example',
  template: `<kirby-menu [closeOnSelect]="false">
  <kirby-item (click)="actionClicked()">
    <kirby-icon name="notification" slot="start"></kirby-icon>
    <h3>Title</h3>
    <kirby-toggle slot="end" checked="true" (checkedChange)="toggled()"></kirby-toggle>
  </kirby-item>
</kirby-menu>`,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class MenuAdvancedExampleComponent {
  template: string = config.template;

  public actionClicked(): void {
    console.log('Action clicked');
  }

  public toggled(): void {
    console.log('Toggle changed');
  }
}
