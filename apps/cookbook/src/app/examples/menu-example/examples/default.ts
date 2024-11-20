import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-menu-default-example',
  template: `<kirby-menu>
  <kirby-item [selectable]="true">
    <h3>No Action 1</h3>
  </kirby-item>
  <kirby-item [selectable]="true">
    <h3>No Action 2</h3>
  </kirby-item>
  <kirby-item [selectable]="true">
    <h3>No Action 3</h3>
  </kirby-item>
</kirby-menu>
`,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class MenuDefaultExampleComponent {
  template: string = config.template;
}
