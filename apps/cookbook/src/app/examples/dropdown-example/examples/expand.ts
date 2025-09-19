import { Component, Input } from '@angular/core';
import { DropdownModule } from '@kirbydesign/designsystem/dropdown';

const config = {
  selector: 'cookbook-dropdown-example-expand',
  template: `<kirby-dropdown
  [size]="size"
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
  imports: [DropdownModule],
})
export class DropdownExampleExpandComponent {
  template: string = config.template;
  @Input() size: string;
}
