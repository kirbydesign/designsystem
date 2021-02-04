import { Component, Input } from '@angular/core';

const config = {
  selector: 'cookbook-dropdown-example-dropdown-right-aligned',
  template: `<kirby-dropdown
  [size]="size"
  placeholder="Right aligned dropdown"
  [items]="['Item 1','Item 2','Item 3','Item 4','Item 5']"
></kirby-dropdown>`,
  styles: [
    `kirby-dropdown {
margin-left: 200px;
}`,
  ],
};

@Component({
  selector: config.selector,
  template: config.template,
  styles: config.styles,
})
export class DropdownExampleDropdownRightAlignedComponent {
  template: string = config.template;
  styles: string = config.styles[0];
  @Input() size: string;
}
