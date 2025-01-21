import { Component, Input } from '@angular/core';
import { DropdownModule } from '@kirbydesign/designsystem/dropdown';

const config = {
  selector: 'cookbook-dropdown-example-pre-selected',
  template: `<kirby-dropdown
  [size]="size"
  [items]="['Item 1','Item 2','Item 3','Item 4','Item 5 (preselected)']"
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
