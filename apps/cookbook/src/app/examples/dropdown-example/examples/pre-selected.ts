import { Component, Input } from '@angular/core';
import { DropdownModule } from '@kirbydesign/designsystem/dropdown';

const config = {
  selector: 'cookbook-dropdown-example-pre-selected',
  template: `<kirby-dropdown
  [size]="size"
  aria-label="Choose your favorite fruit"
        [items]="[
        'Apple',   
        'Banana',
        'Blackberry',
        'Blueberry',   
        'Grapes (preselected)',
      ]"
  [selectedIndex]="4"
></kirby-dropdown>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  imports: [DropdownModule],
})
export class DropdownExamplePreSelectedComponent {
  template: string = config.template;
  @Input() size: string;
}
