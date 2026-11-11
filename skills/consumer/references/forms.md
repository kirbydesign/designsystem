# Forms

## Choose the control

| Requirement                        | Choose                                         | Constraint                                                                                   |
| ---------------------------------- | ---------------------------------------------- | -------------------------------------------------------------------------------------------- |
| Single-line text or numeric entry  | `kirby-form-field` + `input[kirby-input]`      | Use a visible label and an explanatory message when needed.                                  |
| Multiline text                     | `textarea[kirby-textarea]` in a form field     | Import `TextareaComponent`; use the documented counter for limits.                           |
| Locale-formatted decimal           | `input[kirby-input][kirby-decimal-mask]`       | Formatting is not business validation or a monetary storage format.                          |
| Typed date                         | Kirby date input                               | The masked value follows the configured locale.                                              |
| Platform date picker               | Date input with `[useNativeDatePicker]="true"` | Documented as experimental; browser UI varies and values use `yyyy-MM-dd`. Confirm adoption. |
| Visible mutually exclusive options | `kirby-radio-group`                            | Keep radios in the group; supply a group label.                                              |
| Compact single selection           | `kirby-dropdown`                               | Options may represent a form value or filter/sort choice.                                    |
| Independent multiple choices       | `kirby-checkbox`                               | Each choice is independent; a parent "select all" needs indeterminate-state logic.           |
| Binary switch                      | `kirby-toggle` in a list item                  | Provide a label; clarify whether changes apply immediately.                                  |
| Value on a range                   | `kirby-range`                                  | Consult its API for the required bounds/step and accessible naming.                          |

For multiline character limits, use the
[textarea counter example](https://github.com/kirbydesign/designsystem/blob/develop/apps/cookbook/src/app/examples/form-field-example/examples/textarea/counter.ts).

Use the app's existing reactive or template-driven forms convention. A placeholder supplements the
label. Set `hasError` on the control and `message` on the form field to communicate validation;
derive them from actual form state rather than a permanently displayed demo error.

Keep existing application form wrappers, parsers, validators and value-accessor contracts. A mask
or display formatter must not silently change the submitted domain value. Use the application's
translation keys for labels/errors and its configured amount/date formatting utilities.

## Labeled reactive form with validation

Adapted from the Cookbook's
[label/message](https://github.com/kirbydesign/designsystem/blob/develop/apps/cookbook/src/app/examples/form-field-example/examples/input/label-message.ts),
[error](https://github.com/kirbydesign/designsystem/blob/develop/apps/cookbook/src/app/examples/form-field-example/examples/input/error.ts),
and [reactive form](https://github.com/kirbydesign/designsystem/blob/develop/apps/cookbook/src/app/examples/form-field-example/examples/input/reactive-forms.ts)
patterns. This example exposes a validated value; the consuming parent handles persistence and failures.

```ts
import { Component, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from '@kirbydesign/designsystem/button';
import { FormFieldComponent, InputComponent } from '@kirbydesign/designsystem/form-field';

@Component({
  selector: 'app-reference-form',
  standalone: true,
  imports: [ReactiveFormsModule, FormFieldComponent, InputComponent, ButtonComponent],
  template: `
    <form [formGroup]="form" (ngSubmit)="submit()">
      <kirby-form-field label="Reference" [message]="showError ? 'Enter a reference' : ''">
        <input kirby-input formControlName="reference" [hasError]="showError" required />
      </kirby-form-field>
      <button kirby-button type="submit">Continue</button>
    </form>
  `,
})
export class ReferenceFormComponent {
  readonly continued = output<string>();
  readonly form = new FormGroup({
    reference: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });

  get showError(): boolean {
    const control = this.form.controls.reference;
    return control.invalid && control.touched;
  }

  submit(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.continued.emit(this.form.controls.reference.value);
    }
  }
}
```

Check that submitting an empty form displays the error and a valid form emits exactly the entered
value. For reactive forms, enable/disable through the `FormControl`. When changing validators, call
`updateValueAndValidity()`.

## Dropdown value versus action menu

A dropdown retains a selected value; a menu presents actions. The
[forms example](https://github.com/kirbydesign/designsystem/blob/develop/apps/cookbook/src/app/examples/dropdown-example/examples/ng-forms.ts)
binds the selected **item object**, not automatically its `value` property.

In a standalone component, import `ReactiveFormsModule`, `FormFieldComponent` from
`@kirbydesign/designsystem/form-field`, and `DropdownComponent` from
`@kirbydesign/designsystem/dropdown`. For example:

```ts
readonly options = [
  { title: 'Monthly', value: 'monthly' },
  { title: 'Yearly', value: 'yearly' },
];
readonly frequency = new FormControl(this.options[0], { nonNullable: true });
```

```html
<kirby-form-field label="Frequency">
  <kirby-dropdown
    [items]="options"
    itemTextProperty="title"
    [formControl]="frequency"
  ></kirby-dropdown>
</kirby-form-field>
```

Import `FormControl` from `@angular/forms`. Convert the selected object's `value` explicitly at the
application boundary if the domain expects a string. Verify the installed version's item/value
contract before adapting object selections.

## Amount and date fragments

These fragments require `FormFieldComponent` and `InputComponent` from
`@kirbydesign/designsystem/form-field` in the component's imports; the decimal example additionally
requires `DecimalMaskDirective` from that entry point.

```html
<kirby-form-field label="Amount">
  <input
    kirby-input
    type="number"
    kirby-decimal-mask
    [precision]="2"
    [min]="0"
    [padPrecisionDigits]="true"
  />
</kirby-form-field>

<kirby-form-field label="Date">
  <input kirby-input type="date" />
</kirby-form-field>
```

- Decimal masks use locale grouping/separators and default to two fractional digits. Negatives
  require `allowMinus` or a negative `min`. `maxlength` disables fractional digits: use the
  documented numeric bounds/precision instead for decimal amounts.
- The group-separator input is spelled `disableGroupSeperator` in the documented API. Verify the
  installed spelling instead of silently "correcting" it.
- The ordinary numeric input's filtering differs between browsers. Validate domain constraints
  independently of keyboard hints and masking.
- For the native date picker, set `[useNativeDatePicker]="true"` on the date input and supply
  `yyyy-MM-dd`, not a locale-formatted date. Confirm timezone conversion rules before adding them.
- Affixes are intended for `kirby-input`; masked dates do not support prefixed content.

Sources:
[form-field guidance](https://github.com/kirbydesign/designsystem/blob/develop/apps/cookbook/src/app/showcase/form-field-showcase/form-field-showcase.component.html),
[decimal](https://github.com/kirbydesign/designsystem/blob/develop/apps/cookbook/src/app/examples/form-field-example/examples/input/decimal-mask.ts),
[date](https://github.com/kirbydesign/designsystem/blob/develop/apps/cookbook/src/app/examples/form-field-example/examples/input/date.ts),
[native date](https://github.com/kirbydesign/designsystem/blob/develop/apps/cookbook/src/app/examples/form-field-example/examples/input/date-native.ts).

## Choice accessibility and completion

Use `RadioGroupComponent` from `@kirbydesign/designsystem/radio` with a form-field label:

```html
<kirby-form-field label="Delivery">
  <kirby-radio-group [items]="['Digital', 'Post']"></kirby-radio-group>
</kirby-form-field>
```

Supply labels for checkboxes/toggles as well. Extra-small checkbox controls trade away accessibility;
choose the standard sizes unless a documented density requirement justifies otherwise. Checkbox
`attentionLevel` is deprecated and has no effect.

Verify labeling, keyboard selection, required/invalid states, reset, disabled state, and
locale-specific amount/date behavior. Multiple selection must not be implemented by a single-select
dropdown or radio group.

Sources:
[radio](https://github.com/kirbydesign/designsystem/blob/develop/apps/cookbook/src/app/showcase/radio-showcase/radio-showcase.component.html),
[checkbox](https://github.com/kirbydesign/designsystem/blob/develop/apps/cookbook/src/app/showcase/checkbox-showcase/checkbox-showcase.component.html),
[toggle](https://github.com/kirbydesign/designsystem/blob/develop/apps/cookbook/src/app/showcase/toggle-showcase/toggle-showcase.component.html).
