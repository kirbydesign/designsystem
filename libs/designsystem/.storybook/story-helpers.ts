import { componentOnReady } from '@ionic/core';

export const focusSelectableItem =
  (index: number) =>
  async ({ canvasElement }) => {
    const ionItems = canvasElement.querySelectorAll('kirby-item ion-item');
    const ionItem = ionItems[index];
    if (!ionItem) return;

    await new Promise<void>((resolve) => {
      componentOnReady(ionItem, () => resolve());
    });

    const nativeEl = ionItem.shadowRoot?.querySelector('[part="native"]') as HTMLElement;
    nativeEl?.focus();
  };
