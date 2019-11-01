import { Component } from '@angular/core';

const config = {
  selector: 'kirby-item-ex8',
  template: `
  <kirby-item>
  <kirby-avatar overlay="true">
    <kirby-icon name="cog"></kirby-icon>
  </kirby-avatar>
  <kirby-label>
    <h3>Mad og indkøb</h3>
    <h6><time>16.07.2019</time></h6>
  </kirby-label>
  <kirby-value>
    Value
  </kirby-value>
</kirby-item> 
    `,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class ItemThreeColumnsWithAvatarAndSubTitleComponent {
  template: string = config.template;
}
