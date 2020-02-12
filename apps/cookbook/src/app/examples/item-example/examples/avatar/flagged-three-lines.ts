import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-item-example-avatar-flagged-three-lines',
  template: `<kirby-item>
  <div slot="outside">
    <div class="flag success"></div>
    <div class="flag warning"></div>
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
    `.flag {
      width: 8px;
      height: 8px;
      border-radius:50%;
    }`,
    `.flag.success {
      background: var(--kirby-success);
    }`,
    `.flag.warning {
      background: var(--kirby-warning);
    }`,
    `.flag:not(:last-child) {
      margin-bottom: 2px;
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
}
