import { Component, Input } from '@angular/core';
import { DropdownModule } from '@kirbydesign/designsystem/dropdown';

const config = {
  selector: 'cookbook-dropdown-example-keyboard-support',
  template: `
    <h4 id="dropdown-label">Dropdown with keyboard support</h4>
    <br />
    <kirby-dropdown
      aria-labelledby="dropdown-label"
      [size]="size"
      placeholder="Dropdown with keyboard support"
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
export class DropdownExampleKeyboardSupportComponent {
  template: string = config.template;
  @Input() size: string;
}
