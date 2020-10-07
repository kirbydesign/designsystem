import { Component, Input } from '@angular/core';

const config = {
  selector: 'cookbook-dropdown-example-default',
  template: `<kirby-dropdown
  [size]="size"
  placeholder="Dropdown with plain text"
  [items]="['Item 1','Item 2','Item 3','Item 4','Item 5']"
></kirby-dropdown>`,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class DropdownExampleDefaultComponent {
  template: string = config.template;
  @Input() size: string;
}
