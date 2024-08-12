import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-item-example-avatar-flagged',
  template: `<kirby-item>
  <div slot="outside">
    <kirby-badge themeColor="success" size="sm"></kirby-badge>
    <kirby-badge themeColor="warning" size="sm"></kirby-badge>
  </div>
  <kirby-avatar overlay="true" slot="start">
    <kirby-icon name="moneybag"></kirby-icon>
    <kirby-badge>
      <kirby-icon name="attach"></kirby-icon>
    </kirby-badge>
  </kirby-avatar>
  <kirby-label>
    <h3>Lorem ipsum quam notem andamus gepulowitzh onga bonga bimmelon sid est insula</h3>
    <p detail>Phone, Internet, Streaming services og other</p>
  </kirby-label>
  <kirby-flag slot="end" themeColor="success">
    <data value="300.00">EUR 300,00</data>
  </kirby-flag>
</kirby-item>`,
  styles: [
    `div[slot="outside"] {
      display: flex;
      flex-direction: column;
    }`,
  ],
};

@Component({
  selector: config.selector,
  template: config.template,
  styles: config.styles,
})
export class ItemExampleAvatarFlaggedComponent {
  template: string = config.template;
}
