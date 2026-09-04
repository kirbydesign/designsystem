# Kirby Examples

These are compact consumer patterns. Use the [Cookbook](https://cookbook.kirby.design/#/home/intro)
for API details and the [GitHub examples](https://github.com/kirbydesign/designsystem/tree/develop/apps/cookbook/src/app/examples)
for implementations. Replace `develop` in source links with the consumer application's installed
Kirby version when a matching tag exists; otherwise verify the example against the installed package.

## Button

Source: [button-example](https://github.com/kirbydesign/designsystem/tree/develop/apps/cookbook/src/app/examples/button-example)

```ts
import { ButtonComponent } from '@kirbydesign/designsystem/button';
import { IconComponent } from '@kirbydesign/designsystem/icon';
```

```html
<button kirby-button attentionLevel="1">Save</button>
<button kirby-button attentionLevel="2">Cancel</button>
<button kirby-button attentionLevel="3">More</button>
<button kirby-button expand="block">Continue</button>
<button kirby-button size="xs" aria-label="Close">
  <kirby-icon name="close"></kirby-icon>
</button>
```

For icon-only buttons, provide a meaningful `aria-label` or visually hidden text. Use
`showIconOnly` when accessible text should remain in the markup but not render visibly.

## Item row

Source: [item-example](https://github.com/kirbydesign/designsystem/tree/develop/apps/cookbook/src/app/examples/item-example)

```ts
import { IconComponent } from '@kirbydesign/designsystem/icon';
import { ItemComponent, LabelComponent } from '@kirbydesign/designsystem/item';
```

```html
<kirby-item>
  <kirby-icon slot="start" name="person-outline"></kirby-icon>
  <kirby-label>Profile</kirby-label>
  <span slot="end">Optional</span>
</kirby-item>
```

## Form field

Source: [form-field-example](https://github.com/kirbydesign/designsystem/tree/develop/apps/cookbook/src/app/examples/form-field-example)

```ts
import { FormFieldComponent, InputComponent } from '@kirbydesign/designsystem/form-field';
```

```html
<kirby-form-field label="Email" message="Use your work email">
  <input kirby-input type="email" autocomplete="email" />
</kirby-form-field>
```

Set `hasError` and provide an appropriate message for validation errors. For reactive forms,
bind the input to `formControl` or `formControlName` as documented by the Cookbook.

## Modal

Source: [modal-example](https://github.com/kirbydesign/designsystem/tree/develop/apps/cookbook/src/app/examples/modal-example)

```ts
import { ModalComponent, ModalFooterComponent } from '@kirbydesign/designsystem/modal';
import { PageTitleComponent } from '@kirbydesign/designsystem/page';
```

```html
<button id="open-details" kirby-button>Show details</button>

<kirby-modal trigger="open-details">
  <ng-template>
    <kirby-page-title>Details</kirby-page-title>
    <p>Modal content.</p>
    <kirby-modal-footer>
      <button kirby-button attentionLevel="1">Done</button>
    </kirby-modal-footer>
  </ng-template>
</kirby-modal>
```

## Loading

Source: [loading-overlay-example](https://github.com/kirbydesign/designsystem/tree/develop/apps/cookbook/src/app/examples/loading-overlay-example)

```ts
import { CardComponent } from '@kirbydesign/designsystem/card';
import { LoadingOverlayComponent } from '@kirbydesign/designsystem/loading-overlay';
import { SpinnerComponent } from '@kirbydesign/designsystem/spinner';
```

```html
<kirby-spinner></kirby-spinner>

<kirby-loading-overlay [isLoading]="isLoading" [showBackdrop]="true">
  <kirby-card>Content being loaded</kirby-card>
</kirby-loading-overlay>
```

## Styling

```scss
@use '@kirbydesign/designsystem/scss/utils' as *;

.content {
  padding: var(--kirby-spacing-s);
}

@include media('>medium') {
  .content {
    padding: var(--kirby-spacing-m);
  }
}
```
