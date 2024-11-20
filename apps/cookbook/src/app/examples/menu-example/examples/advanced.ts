import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-menu-advanced-example',
  template: `<kirby-menu [closeOnSelect]="false">
  <kirby-item selectable="true">
    <kirby-icon name="person" slot="start"></kirby-icon>
    <kirby-checkbox slot="end">
      <kirby-label>      
        <h3>Face-id</h3>
      </kirby-label>
    </kirby-checkbox>
  </kirby-item>
  <kirby-item selectable="true">
    <kirby-icon name="notification" slot="start"></kirby-icon>
    <kirby-checkbox slot="end">
      <kirby-label>      
        <h3>Notifications</h3>
      </kirby-label>
    </kirby-checkbox>
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
