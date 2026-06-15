import { componentOnReady } from '@ionic/core';

export const focusSelectableItem =
  (index: number) =>
  async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const ionItems = Array.from(canvasElement.querySelectorAll('kirby-item ion-item'));

    await Promise.all(
      ionItems.map(
        (item) => new Promise<void>((resolve) => componentOnReady(item, () => resolve()))
      )
    );

    const selectableItems = ionItems.filter((item) =>
      item.shadowRoot?.querySelector('button[part="native"]')
    );
    const ionItem = selectableItems[index];

    const nativeEl = ionItem?.shadowRoot?.querySelector('button[part="native"]') as HTMLElement;
    nativeEl?.focus();
  };
