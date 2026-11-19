import { TestHelper } from '@kirbydesign/designsystem/testing';

export const focusSelectableItem =
  (index: number) =>
  async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const ionItems = Array.from(canvasElement.querySelectorAll('kirby-item ion-item'));

    await TestHelper.whenReady(ionItems);

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

const rowStyles = `
  .row {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--kirby-spacing-s);
    margin-block-end: var(--kirby-spacing-s);
  }
`;

/**
 * Builds the ids `${prefix}-${surface}-${variantId}` used by stories rendered with `renderOnSurfaces`.
 * Pass them to `pseudoStatesFor`, which appends `-${state}`.
 */
export const idsOnSurfaces = (prefix: string, variantIds: readonly string[]) =>
  surfaces.flatMap((surface) => variantIds.map((id) => `${prefix}-${surface}-${id}`));

/**
 * Renders `content` inside a card for each surface. `surface` is available in the content template,
 * and elements can be laid out side by side with `class="row"`.
 * Pass `stacked` to place the cards below each other instead of side by side.
 * Requires `CardComponent` to be imported by the story.
 */
export const renderOnSurfaces =
  (
    content: string,
    columnWidth = '320px',
    props: Record<string, unknown> = {},
    { stacked = false }: { stacked?: boolean } = {}
  ) =>
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
    styles: [gridStyles(stacked ? 1 : surfaces.length, columnWidth), rowStyles],
  });
