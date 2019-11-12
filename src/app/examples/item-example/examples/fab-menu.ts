import { Component } from '@angular/core';

const config = {
  selector: 'kirby-item-example-fab-menu',
  template: `<kirby-item>
  <kirby-avatar slot="start" imageSrc="/assets/images/woman.png"></kirby-avatar>
  <kirby-label>
    <h3>Line Maria Sørensen</h3>
  </kirby-label>
</kirby-item>`,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class ItemExampleFabMenuComponent {
  template: string = config.template;
}
