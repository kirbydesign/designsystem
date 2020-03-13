import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-dropdown-example-pre-selected',
  template: `<kirby-dropdown
  [items]="['Item 1','Item 2','Item 3','Item 4','Item 5 (preselected)']"
  selectedIndex="4"
></kirby-dropdown>`,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class DropdownExamplePreSelectedComponent {
  template: string = config.template;
}
