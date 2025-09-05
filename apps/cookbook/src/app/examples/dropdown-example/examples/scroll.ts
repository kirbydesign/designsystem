import { Component, Input } from '@angular/core';
import { DropdownModule } from '@kirbydesign/designsystem/dropdown';

const config = {
  selector: 'cookbook-dropdown-example-scroll',
  template: `<kirby-dropdown
  [size]="size"
  aria-label="dropdown-label"
  placeholder="Dropdown with scroll (> 8 items)"
[items]="[
  'Apple',
  'Banana',
  'Blackberry',
  'Blueberry',
  'Carrot',
  'Cherry',
  'Cucumber',
  'Date',
  'Eggplant',
  'Fig',
  'Grapes',
  'Kiwi',
  'Lemon',
  'Mango',
  'Orange',
  'Peach'
]"
></kirby-dropdown>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  imports: [DropdownModule],
})
export class DropdownExampleScrollComponent {
  template: string = config.template;
  @Input() size: string;
}
