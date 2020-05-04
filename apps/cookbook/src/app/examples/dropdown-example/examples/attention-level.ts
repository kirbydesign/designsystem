import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-dropdown-example-attention-level',
  template: `<kirby-dropdown
  placeholder="Dropdown with attention level"
  attentionLevel="2"
  [items]="items">
</kirby-dropdown>`,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class DropdownExampleAttentionLevelComponent {
  template: string = config.template;
  items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];
}
