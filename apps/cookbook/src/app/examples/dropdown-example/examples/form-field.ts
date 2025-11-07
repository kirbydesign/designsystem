import { Component, Input } from '@angular/core';
import { FormFieldComponent } from '@kirbydesign/designsystem/form-field';
import { DropdownComponent } from '@kirbydesign/designsystem/dropdown';

const config = {
  selector: 'cookbook-dropdown-example-form-field',
  template: `<kirby-form-field [label]="'Label'" [message]="'Message'">
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
`,
};

@Component({
  selector: config.selector,
  template: config.template,
  imports: [DropdownComponent, FormFieldComponent],
})
export class DropdownExampleFormFieldComponent {
  template: string = config.template;
  @Input() size: string;
}
