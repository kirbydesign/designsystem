import { Component, Input } from '@angular/core';
import { DropdownModule } from '@kirbydesign/designsystem/dropdown';

const config = {
  selector: 'cookbook-dropdown-example-scroll',
  template: `<kirby-dropdown
  [size]="size"
  placeholder="Dropdown with scroll (> 8 items)"
  [items]="['Item 1','Item 2','Item 3','Item 4','Item 5','Item 6','Item 7','Item 8','Item 9','Item 10','Item 11','Item 12','Item 13','Item 14','Item 15','Item 16']"
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
