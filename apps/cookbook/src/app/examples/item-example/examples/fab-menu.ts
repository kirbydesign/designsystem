import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-item-example-fab-menu',
  template: `<kirby-item>
  <kirby-avatar slot="start" imageSrc="/assets/images/woman.png"></kirby-avatar>
  <p class="kirby-item-title">Line Maria Sørensen</p>
</kirby-item>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  standalone: false,
})
export class ItemExampleFabMenuComponent {
  template: string = config.template;
}
