import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-action-list-advanced-example',
  template: `<kirby-action-list [closeOnSelect]="false">
  <kirby-item (click)="actionClicked()">
    <kirby-icon name="notification" slot="start"></kirby-icon>
    <h3>Title</h3>
    <kirby-toggle slot="end" checked="true" (checkedChange)="toggled()"></kirby-toggle>
  </kirby-item>
</kirby-action-list>`,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class ActionListAdvancedExampleComponent {
  template: string = config.template;

  public actionClicked(): void {
    console.log('Action clicked');
  }

  public toggled(): void {
    console.log('Toggle changed');
  }
}
