import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-menu-default-example',
  template: `<kirby-menu>
  <kirby-item>
    <p class="kirby-item-title">Action 1</p>
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
