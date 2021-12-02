import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-section-header-with-item-group',
  template: `<kirby-item-group>
  <kirby-section-header>
    <h3 class="kirby-text-bold">Item Group</h3>
  </kirby-section-header>
  <kirby-item>
    <kirby-label>
      <h3 class="kirby-text-bold">Title</h3>
      <p detail>Detail</p>
    </kirby-label>
    <kirby-label slot="end">
      <data>Value</data>
    </kirby-label>
  </kirby-item>
  <kirby-item>
    <kirby-label>
      <h3 class="kirby-text-bold">Title</h3>
      <p detail>Detail</p>
    </kirby-label>
    <kirby-label slot="end">
      <data>Value</data>
    </kirby-label>
  </kirby-item>
</kirby-item-group>`,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class SectionHeaderWithItemGroupComponent {
  template: string = config.template;
}
