import { Component, Input } from '@angular/core';
import { DropdownModule } from '@kirbydesign/designsystem/dropdown';

const config = {
  selector: 'cookbook-dropdown-example-default',
  template: `
    <kirby-dropdown
      aria-label="dropdown-label"
      [size]="size"
      placeholder="Dropdown with plain text"
      [items]="[
        'Apple',   
        'Banana',
        'Blackberry',
        'Blueberry',   
        'Grapes',
      ]"
    ></kirby-dropdown>
`,
};

@Component({
  selector: config.selector,
  template: config.template,
  imports: [DropdownModule],
})
export class DropdownExampleDefaultComponent {
  template: string = config.template;
  @Input() size: string;
}
