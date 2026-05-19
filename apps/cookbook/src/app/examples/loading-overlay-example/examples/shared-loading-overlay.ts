import { signal } from '@angular/core';

export function createExampleLoadingOverlayProps() {
  const isLoading = signal(false);
  const showBackdrop = signal(false);
  const hideContent = signal(false);

  const overlayProps = {
    isLoading: isLoading.asReadonly(),
    showBackdrop: showBackdrop.asReadonly(),
    hideContent: hideContent.asReadonly(),
    show(backdrop = false, hide = false) {
      showBackdrop.set(backdrop);
      hideContent.set(hide);
      isLoading.set(true);
      setTimeout(() => overlayProps.hide(), 3000);
    },
    hide() {
      isLoading.set(false);
      showBackdrop.set(false);
      hideContent.set(false);
    },
  };
  return overlayProps;
}
