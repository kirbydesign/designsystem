import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-menu-custom-button-example',
  template: `<kirby-menu>
  <button
    kirby-button
    type="button"
    [attentionLevel]="'3'"
  >
    <kirby-icon [name]="'menu-outline'"></kirby-icon>
  </button>
  <kirby-item>
    Stone
  </kirby-item>
  <kirby-item>
    Rick
  </kirby-item>
  <kirby-item>
    Gooey
  </kirby-item>
</kirby-menu>`,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class MenuCustomButtonExampleComponent {
  template: string = config.template;
}
