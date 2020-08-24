import { Component, Input } from '@angular/core';

const config = {
  selector: 'cookbook-dropdown-example-expand',
  template: `<kirby-dropdown
  [size]="size"
  placeholder="Block level Dropdown"
  expand="block"
  [items]="items"
></kirby-dropdown>`,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class DropdownExampleExpandComponent {
  template: string = config.template;
  items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];
  @Input() size: string;
}
