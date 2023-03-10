import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-menu-hover-trigger-example',
  template: `<kirby-menu [triggers]="['hover']">
  <kirby-item [selectable]="true">
    <h3>Action 1</h3>
  </kirby-item>
  <kirby-item [selectable]="true">
    <h3>Action 2</h3>
  </kirby-item>
</kirby-menu>`,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class MenuHoverTriggerExampleComponent {
  template: string = config.template;
}
