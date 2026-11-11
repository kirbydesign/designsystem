# Modals

## Existing flow first

For an existing feature, preserve its shared modal service/wrapper, controller or routed mechanism
unless migration is requested. Check injected data, result handling, nested overlays and guards
before applying a simpler example. The table below chooses a mechanism for a new flow, not a
requirement to rewrite existing controller-based dialogs.

## Choose the mechanism

| Requirement                                                            | Mechanism                                                 |
| ---------------------------------------------------------------------- | --------------------------------------------------------- |
| Simple template-owned dialog                                           | Declarative `kirby-modal` with a trigger                  |
| Application-state-controlled visibility                                | Declarative `[isOpen]`, resetting state on `(didDismiss)` |
| Programmatic creation, component content or caller/result coordination | `ModalController.showModal`                               |
| Multi-step wizard sharing a modal; direct links into a modal           | Route-based modal with secondary outlet named `modal`     |
| Short confirmation/alert                                               | `ModalController.showAlert` with `AlertConfig`            |

Modals deliberately interrupt the current task. Use ordinary page content or nonblocking feedback
when that interruption is unnecessary.

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

Adapted from the
[modal component example](https://github.com/kirbydesign/designsystem/blob/develop/apps/cookbook/src/app/examples/modal-example/modal-component-example.component.ts).

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

Adapted from
[alert guidance](https://github.com/kirbydesign/designsystem/blob/develop/apps/cookbook/src/app/showcase/alert-showcase/alert-showcase.component.html).

## Controller-based content

For controller component content, verify `ModalConfig`, data passing, result callbacks and
`Modal` APIs against the installed package before implementation.

## Routes, dismissal and focus

- Route-based modals use route `data.modalConfig` and an outlet named `modal`. Consult the
  [outlet example](https://github.com/kirbydesign/designsystem/blob/develop/apps/cookbook/src/app/examples/modal-example/modal-example-outlet.component.ts)
  and [route examples](https://github.com/kirbydesign/designsystem/tree/develop/apps/cookbook/src/app/examples/modal-example/modal-route-example)
  for the app's router structure. Verify direct navigation, browser back and modal dismissal.
  In a hosted microfrontend, also follow the platform's routing contracts and preserve existing
  route composition/guards; the Cookbook's standalone route setup is not a host integration recipe.
- For unsaved changes, clarify the intended dismissal policy, then use the documented `canDismiss`
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

Sizes are `small | medium | large` on larger screens; compact ignores size. Compact dialogs generally
need an explicit `aria-label` matching their visible heading because no title is inferred. The
Cookbook mentions an exception for message-state content; verify that component/version rather than
assuming every compact dialog labels itself.

Source for decisions, focus, guards and flavors:
[modal showcase](https://github.com/kirbydesign/designsystem/blob/develop/apps/cookbook/src/app/showcase/modal-showcase/modal-showcase.component.html).
