import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-item-example-flagged',
  template: `<kirby-item>
  <div slot="outside">
    <kirby-badge themeColor="success" size="sm">
    </kirby-badge>
    <kirby-badge themeColor="warning" size="sm">
    </kirby-badge>
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
export class ItemExampleFlaggedComponent {
  template: string = config.template;
}
