# Modals

## Choose the mechanism

Keep an existing Kirby modal's mechanism and data, result and dismissal contracts unless migration
is requested. Use the table for new flows.

| Requirement                                                            | Mechanism                                                 |
| ---------------------------------------------------------------------- | --------------------------------------------------------- |
| Simple template-owned dialog                                           | Declarative `kirby-modal` with a trigger                  |
| Application-state-controlled visibility                                | Declarative `[isOpen]`, resetting state on `(didDismiss)` |
| Programmatic creation, component content or caller/result coordination | `ModalController.showModal`                               |
| Multi-step wizard sharing a modal; direct links into a modal           | Route-based modal with secondary outlet named `modal`     |
| Short confirmation/alert                                               | `ModalController.showAlert` with `AlertConfig`            |

Modals deliberately interrupt the current task. Use ordinary page content or nonblocking feedback
when that interruption is unnecessary.ä

## Declarative example

The content must be inside `ng-template` so its child view is created/destroyed with the modal.
Provide a meaningful `kirby-page-title`, which labels the dialog and receives initial focus.

```ts
import { Component } from '@angular/core';
import { ButtonComponent } from '@kirbydesign/designsystem/button';
import { ModalComponent } from '@kirbydesign/designsystem/modal';
import { PageTitleComponent } from '@kirbydesign/designsystem/page';

@Component({
  selector: 'app-reference-help',
  standalone: true,
  imports: [ButtonComponent, ModalComponent, PageTitleComponent],
  template: `
    <button kirby-button type="button" id="open-reference-help">Reference help</button>
    <kirby-modal trigger="open-reference-help">
      <ng-template>
        <kirby-page-title>About references</kirby-page-title>
        <p>A reference identifies this record in your overview.</p>
      </ng-template>
    </kirby-modal>
  `,
})
export class ReferenceHelpComponent {}
```

Keep trigger IDs unique in the rendered document. If this component is repeated, derive/provide a
unique ID or use state control instead.

For state-driven dialogs, the template binding and dismissal handler must stay synchronized:

```html
<button kirby-button type="button" (click)="isOpen = true">Reference help</button>
<kirby-modal [isOpen]="isOpen" (didDismiss)="isOpen = false">
  <ng-template>
    <kirby-page-title>About references</kirby-page-title>
    <p>A reference identifies this record in your overview.</p>
  </ng-template>
</kirby-modal>
```

Declare `isOpen = false` in the containing component and use the same imports as above. Test
open, dismiss, then reopen, including Escape and backdrop dismissal.

## Confirmation alert

For a confirmation, inject `ModalController` from `@kirbydesign/designsystem/modal` and use the
actual result rather than treating dismissal as confirmation:

```ts
import { Component, inject, output } from '@angular/core';
import { ButtonComponent } from '@kirbydesign/designsystem/button';
import { AlertConfig, ModalController } from '@kirbydesign/designsystem/modal';

@Component({
  selector: 'app-discard-confirmation',
  standalone: true,
  imports: [ButtonComponent],
  template: `
    <button kirby-button type="button" (click)="confirmDiscard()">Discard changes</button>
  `,
})
export class DiscardConfirmationComponent {
  readonly discardConfirmed = output<void>();
  private readonly modalController = inject(ModalController);

  async confirmDiscard(): Promise<void> {
    const config: AlertConfig = {
      title: 'Discard changes?',
      message: 'Your unsaved changes will be lost.',
      okBtn: 'Discard changes',
      cancelBtn: 'Keep editing',
    };
    await this.modalController.showAlert(config, (confirmed: boolean) => {
      if (confirmed) {
        this.discardConfirmed.emit();
      }
    });
  }
}
```

## Routes, dismissal and focus

- Route-based modals use route `data.modalConfig` and an outlet named `modal`.
  Verify direct navigation, browser back and modal dismissal.
- For unsaved changes, clarify the intended dismissal policy, then use `canDismiss`
  configuration. Verify close button, Escape, backdrop and route changes rather than guarding only
  a footer button.
- When a step replaces the modal title, the embedded component can inject `Modal` and call
  `focusTitle()` to announce the new context.
- Normal modals trap focus while open and restore it to the previous element on close. Test this
  with the actual trigger and content.

## Flavors and sizes

`modal` is full-screen on small screens and centered on larger screens. `drawer` is a
content-height sheet on small screens and behaves like a modal on larger screens. `compact`
has no toolbar, close button or content scrolling; use it for informational content, not a long form.

Sizes are `small | medium | large` on larger screens; compact ignores size.
Give compact modals an explicit `aria-label` matching the visible heading. Set it directly on
`kirby-modal`, or through `ModalConfig.htmlAttributes` for controller-based content. Verify the
rendered dialog's accessible name rather than relying on a child component to label it.
