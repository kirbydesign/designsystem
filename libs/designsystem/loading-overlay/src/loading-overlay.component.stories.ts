import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';
import { expect, waitFor, within } from 'storybook/test';
import { LoadingOverlayComponent } from '@kirbydesign/designsystem/loading-overlay';
import { CardComponent } from '@kirbydesign/designsystem/card';
// eslint-disable-next-line no-restricted-imports
import { renderOnSurfaces } from '../../.storybook/story-helpers';

const meta: Meta<LoadingOverlayComponent> = {
  component: LoadingOverlayComponent,
  title: 'Components / Loading Overlay',
  decorators: [
    moduleMetadata({
      imports: [CardComponent],
    }),
  ],
};
export default meta;
type Story = StoryObj<LoadingOverlayComponent>;

export const LoadingOverlay: Story = {
  args: {
    isLoading: true,
    showBackdrop: true,
    hideContent: false,
  },
};

export const ScrollableContent: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 16px;">
        <kirby-loading-overlay
          data-testid="loading"
          style="flex: 1; display: block; height: 200px; overflow-y: auto;"
          [isLoading]="true"
          [showBackdrop]="true"
          [hideContent]="false"
        >
          @for (item of items; track item) {
            <p>Scrollable content line {{ item }}</p>
          }
        </kirby-loading-overlay>
        <kirby-loading-overlay
          data-testid="loaded"
          style="flex: 1; display: block; height: 200px; overflow-y: auto;"
          [isLoading]="false"
          [showBackdrop]="true"
          [hideContent]="false"
        >
          @for (item of items; track item) {
            <p>Scrollable content line {{ item }}</p>
          }
        </kirby-loading-overlay>
      </div>
    `,
    props: {
      items: Array.from({ length: 20 }, (_, index) => index + 1),
    },
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const loading = canvas.getByTestId('loading');
    const loaded = canvas.getByTestId('loaded');

    // Loading content is clipped by .overlay-wrapper.loading.
    expect(loading.scrollHeight).toBe(loading.clientHeight);

    loading.scrollTop = loading.scrollHeight;
    expect(loading.scrollTop).toBe(0);

    // Loaded content contributes to the host's overflow.
    expect(loaded.scrollHeight).toBeGreaterThan(loaded.clientHeight);

    loaded.scrollTop = loaded.scrollHeight;

    await waitFor(() => {
      expect(loaded.scrollTop).toBeGreaterThan(0);
    });
  },
};

export const Surfaces: Story = {
  render: renderOnSurfaces(
    `
    @for (variant of variants; track variant.label) {
      <kirby-loading-overlay
        [isLoading]="true"
        [showBackdrop]="variant.showBackdrop"
        [hideContent]="variant.hideContent"
      >
        <p class="kirby-text-normal">{{ variant.label }}, {{ surface }}</p>
        <p class="kirby-text-small">Content behind the overlay</p>
      </kirby-loading-overlay>
    }
  `,
    '320px',
    {
      variants: [
        { label: 'backdrop', showBackdrop: true, hideContent: false },
        { label: 'hide content', showBackdrop: true, hideContent: true },
        { label: 'no backdrop', showBackdrop: false, hideContent: false },
      ],
    }
  ),
};
