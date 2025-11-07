import { Component } from '@angular/core';
import { DropdownComponent } from '@kirbydesign/designsystem/dropdown';

const config = {
  selector: 'cookbook-dropdown-example-states',
  template: `<kirby-dropdown
  [placeholder]="'Choose your favorite fruit'"
  aria-label="Choose your favorite fruit"
  [items]="[
    'Apple',
    'Banana',
    'Blackberry',
    'Blueberry',
    'Grapes',
    ]"
></kirby-dropdown>
<kirby-dropdown
  [disabled]="true"
  [placeholder]="'Choose your favorite fruit'"
  aria-label="Choose your favorite fruit"
  [items]="[
    'Apple',
    'Banana',
    'Blackberry',
    'Blueberry',
    'Grapes',
    ]"
></kirby-dropdown>
<kirby-dropdown
  [hasError]="true"
  [placeholder]="'Choose your favorite fruit'"
  aria-label="Choose your favorite fruit"
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
export class DropdownExampleStatesComponent {
  template: string = config.template;
}
