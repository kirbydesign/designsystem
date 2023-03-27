import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-menu-selectable-example',
  template: `<kirby-menu [closeOnSelect]="true">
  <kirby-item [selectable]="true">
    <h3>Action 1</h3>
  </kirby-item>
  ...
</kirby-menu>`,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class MenuSelectableExampleComponent {
  template: string = config.template;
}
