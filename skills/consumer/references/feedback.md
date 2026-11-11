# Feedback

## Choose the feedback

| Intent                                  | Choose                                               | Important distinction                                                                                         |
| --------------------------------------- | ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| Subtle, noncritical result notification | `ToastController`                                    | A toast disappears; essential instructions belong in persistent content.                                      |
| Blocking confirmation                   | `ModalController.showAlert`                          | Use a meaningful title and explicit action labels; follow the [modal recipe](./modals.md#confirmation-alert). |
| Local loading                           | `kirby-loading-overlay` around the affected content  | Scope it to the content being loaded.                                                                         |
| Full-page loading                       | `LoadingOverlayService`                              | Every `showLoadingOverlay` requires `hideLoadingOverlay`.                                                     |
| Small inline busy indicator             | `kirby-spinner`                                      | Supply surrounding text/context for what is loading.                                                          |
| No content                              | `kirby-empty-state`                                  | Explain the state and any available next action.                                                              |
| Status label/count/visual progress      | `kirby-flag`, `kirby-badge`, `kirby-progress-circle` | Preserve a textual meaning; color alone is insufficient.                                                      |

## Success toast after a successful operation

Use this in a component/service, after the operation has actually succeeded:

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

The documented types are `success` and `warning`; verify additional types before using them.
Keep text short. Default duration is 4000ms. `durationInMs: 0` requires explicit dismissal through
the overlay returned by `showToast()`; the user has no close control.

Source:
[toast](https://github.com/kirbydesign/designsystem/blob/develop/apps/cookbook/src/app/showcase/toast-showcase/toast-showcase.component.html).

## Loading and cleanup

For loading services, dismiss in the app's normal success/error/cleanup path, such as a `finally`
block or RxJS `finalize`, while preserving the app's error notification behavior. For a wrapper,
bind `isLoading` to real request state and reset it on both success and failure.

Source:
[loading overlay](https://github.com/kirbydesign/designsystem/blob/develop/apps/cookbook/src/app/showcase/loading-overlay-showcase/loading-overlay-showcase.component.html).
