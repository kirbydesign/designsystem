import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-menu-custom-placement-example',
  template: `<kirby-menu [placement]="'bottom-end'">
  <kirby-item>
    <p class="kirby-item-title">Action 1</p>
  </kirby-item>
  ...
</kirby-menu>`,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class MenuCustomPlacementExampleComponent {
  template: string = config.template;
}
