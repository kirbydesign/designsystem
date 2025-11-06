import { Component, Input } from '@angular/core';
import { DropdownComponent } from '@kirbydesign/designsystem/dropdown';

const config = {
  selector: 'cookbook-dropdown-example-states',
  template: `<kirby-dropdown
  [placeholder]="'Enabled'"
  [size]="size"
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
  [placeholder]="'Disabled'"
  [size]="size"
  [items]="[
    'Apple',
    'Banana',
    'Blackberry',
    'Blueberry',
    'Grapes',
    ]"
></kirby-dropdown>
<kirby-dropdown
  [size]="size"
  [hasError]="true"
  [placeholder]="'Error'"
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
      gap: var(--kirby-spacing-xs);
    }
  `,
  imports: [DropdownComponent],
})
export class DropdownExampleStatesComponent {
  template: string = config.template;
  @Input() size: string;
}
