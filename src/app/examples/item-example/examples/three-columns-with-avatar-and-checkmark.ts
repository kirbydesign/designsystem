import { Component } from '@angular/core';

const config = {
  selector: 'kirby-item-ex13',
  template: `
  <kirby-item>
  <kirby-avatar overlay="true">
    <kirby-icon name="cog"></kirby-icon>
  </kirby-avatar>
  <kirby-label>
    <h3 class="bold">Mad og indkøb</h3>
  </kirby-label>
  <kirby-icon name="checkmark-selected"></kirby-icon>
</kirby-item>
    `,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class ItemThreeColumnsWithAvatarAndCheckmarkComponent {
  template: string = config.template;
}
