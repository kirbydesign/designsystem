import { Component, Input } from '@angular/core';
import { FormFieldComponent } from '@kirbydesign/designsystem/form-field';
import { DropdownComponent } from '@kirbydesign/designsystem/dropdown';

const config = {
  selector: 'cookbook-dropdown-example-form-field',
  template: `<kirby-form-field [label]="'Label for medium dropdown'" [message]="'Message'">
  <kirby-dropdown
    placeholder="Dropdown in form field"
    [items]="[
      'Apple',
      'Banana',
      'Blackberry',
      'Blueberry',
      'Grapes',
      ]"
  ></kirby-dropdown>
</kirby-form-field>

<kirby-form-field [label]="'Label for small dropdown'" [message]="'Message'">
  <kirby-dropdown
    placeholder="Dropdown in form field"
    [size]="'sm'"
    [items]="[
      'Apple',
      'Banana',
      'Blackberry',
      'Blueberry',
      'Grapes',
      ]"
  ></kirby-dropdown>
</kirby-form-field>
`,
};

@Component({
  selector: config.selector,
  template: `
    <div class="column-layout constrain-width">${config.template}</div>
  `,
  styleUrl: './dropdown-examples.shared.scss',
  imports: [DropdownComponent, FormFieldComponent],
})
export class DropdownExampleFormFieldComponent {
  template: string = config.template;
}
