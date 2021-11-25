import { Component } from '@angular/core';

export const ItemGroupsInListTemplate = `
<kirby-list-experimental>
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
</kirby-list-experimental>`;

@Component({
  selector: 'cookbook-item-group-example',
  template: `
    <kirby-page title="Item Group">
      <kirby-page-content>
        ${ItemGroupsInListTemplate}
      </kirby-page-content>
    </kirby-page>
  `,
  styleUrls: ['./item-group-example.component.scss'],
})
export class ItemGroupExampleComponent {}
