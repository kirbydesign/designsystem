import { Component } from '@angular/core';

const config = {
  selector: 'kirby-item-example-avatar-flagged-three-lines',
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
    <p>Basic Insurance</p>
    <p subtitle>Account - Budget Account</p>
  </kirby-label>
  <kirby-label slot="end">
    <data class="kirby-text-bold" value="value">Value</data>
  </kirby-label>
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
