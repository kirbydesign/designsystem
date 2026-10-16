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

export const interactionStates = ['default', 'hover', 'active', 'focus-visible'] as const;
export type InteractionState = (typeof interactionStates)[number];

/**
 * Builds `storybook-addon-pseudo-states` parameters for elements with id `${id}-${state}`.
 * Pass `target` to apply the state to a descendant of that element instead.
 */
export const pseudoStatesFor = (ids: string[], target?: string) => {
  const selectorsFor = (state: InteractionState) =>
    ids.map((id) => `#${id}-${state}${target ? ` ${target}` : ''}`);

  return {
    hover: selectorsFor('hover'),
    active: selectorsFor('active'),
    focusVisible: selectorsFor('focus-visible'),
  };
};

export const gridStyles = (columns: number, columnWidth: string) => `
  .grid {
    display: grid;
    grid-template-columns: repeat(${columns}, ${columnWidth});
    gap: var(--kirby-spacing-s);
    padding: var(--kirby-spacing-s);
  }
`;
