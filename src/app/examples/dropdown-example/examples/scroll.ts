import { Component } from '@angular/core';

const config = {
  selector: 'kirby-dropdown-example-scroll',
  template: `<kirby-dropdown
  placeholder="Dropdown with scroll (> 5 items)"
  [items]="['Item 1','Item 2','Item 3','Item 4','Item 5','Item 6','Item 7','Item 5','Item 9','Item 10']"
></kirby-dropdown>`,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class DropdownExampleScrollComponent {
  template: string = config.template;
}
