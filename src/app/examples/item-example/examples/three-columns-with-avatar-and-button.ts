import { Component } from '@angular/core';

const config = {
  selector: 'kirby-item-ex11',
  template: `
  <kirby-item>
      <kirby-avatar overlay="true" slot="start">
          <kirby-icon name="cog"></kirby-icon>
          <kirby-badge>
          <kirby-icon name="attach"></kirby-icon>
          </kirby-badge>
      </kirby-avatar>
      <kirby-label>
        <h3>Lorem ipsum quam notem andamus gepulowitzh onga bonga bimmelon sid est insula</h3>
        <h6>Telefon, Internet, Streaming tjenester og andet militærmusik</h6>
      </kirby-label>
      <button kirby-button size="sm" slot="end">Small Button</button>
  </kirby-item>
    `,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class ItemThreeColumnsWithAvatarAndButtonComponent {
  template: string = config.template;
}
