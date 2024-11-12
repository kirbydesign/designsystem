import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-menu-advanced-example',
  template: `<kirby-menu [closeOnSelect]="false">
  <kirby-item>
    <kirby-icon name="notification" slot="start"></kirby-icon>
    <h3>Notifications</h3>
    <kirby-toggle slot="end"></kirby-toggle>
  </kirby-item>
  <kirby-item>
    <kirby-icon name="person" slot="start"></kirby-icon>
    <h3>Use face id</h3>
    <kirby-checkbox slot="end"></kirby-checkbox>
  </kirby-item>
</kirby-menu>`,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class MenuAdvancedExampleComponent {
  template: string = config.template;
}
