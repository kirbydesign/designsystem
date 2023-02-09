import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-item-example-simple-md',
  template: `<kirby-item>
  <h3>Medium (default)</h3>
  <kirby-dropdown
  slot="end"
  placeholder="Dropdown with plain text"
  [items]="[
    'Item 1',
    'Item 2',
    'Item 3',
    'Item 4',
    'Item 5',
    'Item 1',
    'Item 2',
    'Item 3',
    'Item 4',
    'Item 5',
    'Item 1',
    'Item 2',
    'Item 3',
    'Item 4',
    'Item 5'
  ]"
></kirby-dropdown>
</kirby-item>`,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class ItemExampleSimpleMediumComponent {
  template: string = config.template;
}
