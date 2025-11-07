import { Component, Input } from '@angular/core';
import { DropdownComponent } from '@kirbydesign/designsystem/dropdown';

const config = {
  selector: 'cookbook-dropdown-example-expand',
  template: `<kirby-dropdown
  placeholder="Block level Dropdown"
  aria-label="Choose your favorite fruit"
  expand="block"
  [items]="[
    'Apple',
    'Banana',
    'Blackberry',
    'Blueberry',
    'Grapes',
    ]"
></kirby-dropdown>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  imports: [DropdownComponent],
})
export class DropdownExampleExpandComponent {
  template: string = config.template;
  @Input() size: string;
}
