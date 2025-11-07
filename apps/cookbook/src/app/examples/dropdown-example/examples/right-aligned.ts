import { Component, Input } from '@angular/core';
import { DropdownComponent } from '@kirbydesign/designsystem/dropdown';

const config = {
  selector: 'cookbook-dropdown-example-right-aligned',
  template: `<kirby-dropdown
  placeholder="Right aligned (opens left)"
  aria-label="Choose your favorite fruit"
  [items]="[
    'Apple',
    'Banana',
    'Blackberry',
    'Blueberry',
    'Grapes',
    ]"
  popout="left"
></kirby-dropdown>`,
  styles: [
    `:host(.right-align) {
  display: flex;
}`,
    `kirby-dropdown {
  margin-left: auto;
}`,
  ],
};

@Component({
  selector: config.selector,
  template: config.template,
  styles: config.styles,
  host: { '[class.right-align]': 'true' },
  imports: [DropdownComponent],
})
export class DropdownExampleRightAlignedComponent {
  template: string = config.template;
  styles: string = config.styles.join(`
`);
  @Input() size: string;
}
