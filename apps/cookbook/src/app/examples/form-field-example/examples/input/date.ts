import { Component, Input } from '@angular/core';

import { InputSize } from '@kirbydesign/designsystem';

const config = {
  selector: 'cookbook-form-field-input-date-example',
  template: `<kirby-form-field label="Input with date mask *">
  <input kirby-input type="date" [size]="size" />
</kirby-form-field>

<kirby-form-field label="Standard HTML date input (native date picker)">
  <input kirby-input type="date" [size]="size" [useNativeDatePicker]="true" />
  <kirby-icon kirby-affix="suffix" name="calendar"></kirby-icon>
</kirby-form-field>`,
};

/*
TODO: Use kirby-icon name="calendar" as default and allow custom icons

Idea for solution:

- Introduce input property with `kirby-input` directive, e.g. `iconName` - should map directly to kirby-icon's `name` property
- Since kirby-icon's `customName` property is about to be deprecated and removed we will not use that
- This new property is just a shorthand
- Decide if it should be a general shortcut to suffixing a kirby-icon or if it should only be usable with input type date and maybe also require useNativeDatePicker=true
- Ignore if used in conjunction with `kirby-affix`
  - If used in conjunction with kirby-affix="suffix" then *that* should take precedence over iconName

Examples:

<input kirby-input type="date" [size]="size" [useNativeDatePicker]="true" [iconName]="calendar" />
<input kirby-input type="date" [size]="size" [useNativeDatePicker]="true" [iconName]="inbox" />

Example with custom icon (no difference but icon must be registered manually):

<input kirby-input type="date" [size]="size" [useNativeDatePicker]="true" [iconName]="rainbow-unicorn-superhero-rockstar" />

*/

@Component({
  selector: config.selector,
  template: config.template,
})
export class FormFieldInputDateExampleComponent {
  template: string = config.template;
  @Input() size: InputSize;
}
