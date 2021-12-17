import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-simple-item-group-example',
  template: `<kirby-item-group>
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
`,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class ItemGroupSimpleExampleComponent {
  template: string = config.template;
}
