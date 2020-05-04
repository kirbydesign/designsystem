import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-item-example-avatar-flagged',
  template: `<kirby-item>
  <div slot="outside">
    <div class="flag success"></div>
    <div class="flag warning"></div>
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
  <data slot="end" value="300.00">EUR 300,00</data>
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
    `data {
      background-color: var(--kirby-success);
      border-radius: 4px;
      padding: 2px 8px;
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
