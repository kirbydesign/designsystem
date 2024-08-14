import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-item-example-avatar-flagged-three-lines',
  template: `<kirby-item>
  <div slot="outside">
    <kirby-badge themeColor="success" size="sm"></kirby-badge>
    <kirby-badge themeColor="warning" size="sm"></kirby-badge>
  </div>
  <kirby-avatar overlay="true" slot="start">
    <kirby-icon name="moneybag"></kirby-icon>
  </kirby-avatar>
  <kirby-label>
    <h3>Jake The Snake Insurance</h3>
    <p subtitle>Basic Insurance</p>
    <p detail>Account - Budget Account</p>
  </kirby-label>
  <data slot="end" class="kirby-text-bold" value="value">Value</data>
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
export class ItemExampleAvatarFlaggedThreeLinesComponent {
  template: string = config.template;
  styles: string = config.styles[0];
}
