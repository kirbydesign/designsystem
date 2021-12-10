import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-item-group-with-section-header-example',
  template: `<kirby-item-group>
  <kirby-section-header>
    <h3 heading>Item Group</h3>
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
</kirby-item-group>
<kirby-item-group>
  <kirby-section-header>
    <h3 heading>Item Group</h3>
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
export class ItemGroupWithSectionHeaderExampleComponent {
  template: string = config.template;
}
