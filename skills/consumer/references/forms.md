# Forms

## Choose the control

| Requirement                        | Choose                                         | Constraint                                                                         |
| ---------------------------------- | ---------------------------------------------- | ---------------------------------------------------------------------------------- |
| Single-line text or numeric entry  | `kirby-form-field` + `input[kirby-input]`      | Use a visible label and an explanatory message when needed.                        |
| Multiline text                     | `textarea[kirby-textarea]` in a form field     | Import `TextareaComponent`; use `kirby-input-counter` for character limits.        |
| Locale-formatted decimal           | `input[kirby-input][kirby-decimal-mask]`       | Formatting is not business validation or a monetary storage format.                |
| Typed date                         | Kirby date input                               | The masked value follows the configured locale.                                    |
| Platform date picker               | Date input with `[useNativeDatePicker]="true"` | Experimental; browser UI varies and values use `yyyy-MM-dd`. Confirm adoption.     |
| Visible mutually exclusive options | `kirby-radio-group`                            | Keep radios in the group; supply a group label.                                    |
| Compact single selection           | `kirby-dropdown`                               | Options may represent a form value or filter/sort choice.                          |
| Searchable single selection        | Extension `kirby-x-combobox`                   | Filters options; retains one selected item, not multiple choices.                  |
| Independent multiple choices       | `kirby-checkbox`                               | Each choice is independent; a parent "select all" needs indeterminate-state logic. |
| Binary switch                      | `kirby-toggle` in a list item                  | Provide a label; clarify whether changes apply immediately.                        |
| Value on a range                   | `kirby-range`                                  | Verify bounds, step and accessible naming against its installed API.               |

A placeholder supplements the label. Set `hasError` on the control and `message` on the form field
to communicate validation;
derive them from actual form state rather than a permanently displayed demo error.

Keep masked/formatted display separate from the submitted domain value.

## Labeled reactive form with validation

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
value. For reactive forms, enable/disable through the `FormControl`.

## Dropdown value versus action menu

A dropdown retains a selected value; a menu presents actions. With object items, the form control
holds the selected **item object**, not automatically its `value` property.

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
application boundary if the domain expects a string.

## Searchable single selection

Use `ComboboxComponent` from `@kirbydesign/extensions-angular/combobox` when selection requires
searching/filtering. Use the core dropdown for an ordinary compact selector.

```ts
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ComboboxComponent } from '@kirbydesign/extensions-angular/combobox';

@Component({
  selector: 'app-currency-picker',
  standalone: true,
  imports: [ReactiveFormsModule, ComboboxComponent],
  template: `
    <label id="currency-picker-label">Currency</label>
    <kirby-x-combobox
      [items]="currencies"
      [formControl]="currency"
      aria-labelledby="currency-picker-label"
    ></kirby-x-combobox>
  `,
})
export class CurrencyPickerComponent {
  readonly currencies = ['EUR', 'DKK'];
  readonly currency = new FormControl('EUR', { nonNullable: true });
}
```

The form value and `(change)` payload are the selected item, not a DOM event or array.
For object options, defaults are `itemTextProperty="text"` and `itemIdProperty="id"`; configure
them for the actual fields and use unique string IDs. Control disabled state through the form.
A placeholder is not an accessible name; use `aria-label` or `aria-labelledby` and unique label IDs.

For custom rows, import `ComboboxItemTemplateDirective` from the same entry point and use
`*kirbyXComboboxItemTemplate`. Supply `itemHeight` and matching item IDs for focus/scroll behavior.

## Multiline character counter

Import `FormFieldComponent`, `TextareaComponent` and `InputCounterComponent` from
`@kirbydesign/designsystem/form-field`. Set `maxlength` on the textarea and bind the counter's
`listenTo` input to its template reference.

```html
<kirby-form-field label="Message">
  <textarea kirby-textarea #message [maxlength]="140"></textarea>
  <kirby-input-counter [listenTo]="message"></kirby-input-counter>
</kirby-form-field>
```

## Amount and date fragments

Use the configured locale and formatting settings. Ask before changing currency, precision,
date-only versus timestamp or timezone semantics; localized display is not an API data format.

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
  numeric bounds/precision instead for decimal amounts.
- The group-separator input is spelled `disableGroupSeperator`.
- The ordinary numeric input's filtering differs between browsers. Validate domain constraints
  independently of keyboard hints and masking.
- For the native date picker, set `[useNativeDatePicker]="true"` on the date input and supply
  `yyyy-MM-dd`, not a locale-formatted date. Confirm timezone conversion rules before adding them.
- Affixes are intended for `kirby-input`; masked dates do not support prefixed content.

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
