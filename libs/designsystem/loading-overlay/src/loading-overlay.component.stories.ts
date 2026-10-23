import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';
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
