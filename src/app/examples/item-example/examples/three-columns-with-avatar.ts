import { Component } from '@angular/core';

const config = {
  selector: 'kirby-item-ex7',
  template: `
  <kirby-item>
    <kirby-avatar overlay="true">
      <kirby-icon name="cog"></kirby-icon>
    </kirby-avatar>
    <kirby-label>
      <h3>Mad og indkøb</h3>
    </kirby-label>
    <kirby-value>
      -849,00
    </kirby-value>
</kirby-item>
    `,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class ItemThreeColumnsWithAvatarComponent {
  template: string = config.template;
}
