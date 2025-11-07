import { Component, Input } from '@angular/core';
import { DropdownComponent } from '@kirbydesign/designsystem/dropdown';

const config = {
  selector: 'cookbook-dropdown-example-sizes',
  template: `<kirby-dropdown
  aria-label="Choose your favorite fruit"
  placeholder="Choose your favorite fruit"
  [items]="[
    'Apple',
    'Banana',
    'Blackberry',
    'Blueberry',
    'Grapes',
    ]"
></kirby-dropdown>

<kirby-dropdown
  [size]="'sm'"
  aria-label="Choose your favorite fruit"
  placeholder="Choose your favorite fruit"
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
  styles: `
    :host {
      display: flex;
      flex-wrap: wrap;
      gap: var(--kirby-spacing-m);
    }
  `,
  imports: [DropdownComponent],
})
export class DropdownExampleSizesComponent {
  template: string = config.template;
}
