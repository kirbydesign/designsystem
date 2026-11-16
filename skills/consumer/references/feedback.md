# Feedback

## Choose the feedback

| Intent                                  | Choose                                               | Important distinction                                                                                         |
| --------------------------------------- | ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| Subtle, noncritical result notification | `ToastController`                                    | A toast disappears; essential instructions belong in persistent content.                                      |
| Blocking confirmation                   | `ModalController.showAlert`                          | Use a meaningful title and explicit action labels; follow the [modal recipe](./modals.md#confirmation-alert). |
| Local loading                           | `kirby-loading-overlay` around the affected content  | Scope it to the content being loaded.                                                                         |
| Full-page loading                       | `LoadingOverlayService`                              | Global overlay for full-page loading.                                                                         |
| Small inline busy indicator             | `kirby-spinner`                                      | Supply surrounding text/context for what is loading.                                                          |
| Placeholder matching unloaded content   | Extension `kirby-x-skeleton-loader`                  | Mimics content shape; does not track loading or block interaction.                                            |
| No content                              | `kirby-empty-state`                                  | Explain the state and any available next action.                                                              |
| Status label/count/visual progress      | `kirby-flag`, `kirby-badge`, `kirby-progress-circle` | Preserve a textual meaning; color alone is insufficient.                                                      |

## Success toast

Show a success toast only after the operation succeeds:

```ts
import { inject } from '@angular/core';
import { ToastController } from '@kirbydesign/designsystem/toast';
```

```ts
private readonly toastController = inject(ToastController);

async showSavedFeedback(): Promise<void> {
  await this.toastController.showToast({
    message: 'Changes saved',
    messageType: 'success',
  });
}
```

Toast message types are `success` and `warning`.
Keep text short. Default duration is 4000ms. `durationInMs: 0` requires explicit dismissal through
the overlay returned by `showToast()`; the user has no close control.

## Loading and cleanup

Pair every `LoadingOverlayService.showLoadingOverlay()` call with `hideLoadingOverlay()`,
including failure paths. For `kirby-loading-overlay`, keep `isLoading` synchronized with the
actual loading state.

## Skeleton placeholders

Import `SkeletonLoaderComponent` from `@kirbydesign/extensions-angular/skeleton-loader`.
Choose `rectangle`, `circle` or `pill`; size with CSS width/height. The loader follows its surface.
Its deprecated `theme` input has no effect; use the surrounding Kirby surface instead.

```ts
import { Component, input } from '@angular/core';
import { SkeletonLoaderComponent } from '@kirbydesign/extensions-angular/skeleton-loader';

@Component({
  selector: 'app-summary-placeholder',
  standalone: true,
  imports: [SkeletonLoaderComponent],
  template: `
    <div [attr.aria-busy]="isLoading()">
      @if (isLoading()) {
        <p role="status">Loading summary</p>
        <kirby-x-skeleton-loader
          shape="pill"
          style="width: 10rem"
          aria-hidden="true"
        ></kirby-x-skeleton-loader>
      } @else {
        <ng-content></ng-content>
      }
    </div>
  `,
})
export class SummaryPlaceholderComponent {
  readonly isLoading = input.required<boolean>();
}
```

The parent supplies actual loading state. Keep placeholder shapes decorative and expose loading
meaning through surrounding text; the skeleton does not supply an accessible status message.
