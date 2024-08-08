import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-item-example-flagged',
  template: `<kirby-item>
  <div slot="outside">
    <div class="flag success"></div>
    <div class="flag warning"></div>
  </div>
  <kirby-label>
    <h3 class="kirby-text-bold">Title</h3>
    <p detail>Detail</p>
  </kirby-label>
  <kirby-flag slot="end" themeColor="success">
    <data value="60.0">60</data>
  </kirby-flag>
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
export class ItemExampleFlaggedComponent {
  template: string = config.template;
}
