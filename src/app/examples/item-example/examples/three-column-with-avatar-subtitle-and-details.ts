import { Component } from '@angular/core';

const config = {
  selector: 'kirby-item-ex10',
  template: `
  <kirby-item>
  <kirby-avatar overlay="true">
    <kirby-icon name="cog"></kirby-icon>
    <kirby-badge>
      <kirby-icon name="attach"></kirby-icon>
    </kirby-badge>
  </kirby-avatar>
  <kirby-label>
    <h3>ALM.Brand forsikring A/S</h3>
    <h4>Familiens - Basisforsikring</h4>
    <h4>Totalkonto - Budgetkonto</h4>
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
export class ItemThreeColumnsWithSubtitleAndDetailsComponent {
  template: string = config.template;
}
