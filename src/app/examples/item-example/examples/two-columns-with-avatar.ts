import { Component } from '@angular/core';

const config = {
  selector: 'kirby-item-ex6',
  template: `
  <kirby-item>
  <kirby-avatar overlay="true">
    <kirby-icon name="cog"></kirby-icon>
    <kirby-badge>
      <kirby-icon name="attach"></kirby-icon>
    </kirby-badge>
  </kirby-avatar>
  <kirby-label>
    <h3>Title</h3>
  </kirby-label>
</kirby-item>
    `,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class ItemTwoColumnsWithAvatarComponent {
  template: string = config.template;
}
