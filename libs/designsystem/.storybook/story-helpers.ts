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

export const surfaces = ['base', 'raised', 'brand'] as const;
export type Surface = (typeof surfaces)[number];

/**
 * Ionic only renders its active state when `.ion-activated` is set on the host,
 * which `storybook-addon-pseudo-states` can't force.
 */
export const activateIonicElements =
  (selector: string) =>
  async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const elements = Array.from(canvasElement.querySelectorAll<HTMLElement>(selector));
    await Promise.all(
      elements.map((el) => new Promise<void>((resolve) => componentOnReady(el, () => resolve())))
    );
    elements.forEach((el) => el.classList.add('ion-activated'));
  };

/**
 * Builds `storybook-addon-pseudo-states` parameters for elements with id `${id}-${state}`.
 * Pass `targets` to apply the state to descendants of that element instead.
 */
export const pseudoStatesFor = (ids: string[], targets?: string | string[]) => {
  const descendants = targets === undefined ? [''] : [targets].flat().map((t) => ` ${t}`);
  const selectorsFor = (state: InteractionState) =>
    ids.flatMap((id) => descendants.map((descendant) => `#${id}-${state}${descendant}`));

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

/**
 * Renders `content` inside a card for each surface. `surface` is available in the content template.
 * Requires `CardComponent` to be imported by the story.
 */
export const renderOnSurfaces =
  (content: string, columnWidth = '320px', props: Record<string, unknown> = {}) =>
  () => ({
    props: { ...props, surfaces },
    template: `
      <div class="grid">
        @for (surface of surfaces; track surface) {
          <kirby-card [variant]="surface" [hasPadding]="true">
            ${content}
          </kirby-card>
        }
      </div>
    `,
    styles: [gridStyles(surfaces.length, columnWidth)],
  });
