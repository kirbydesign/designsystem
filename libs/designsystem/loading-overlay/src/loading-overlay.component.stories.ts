import type { Meta, StoryObj } from '@storybook/angular';
import { LoadingOverlayComponent } from '@kirbydesign/designsystem/loading-overlay';

const meta: Meta<LoadingOverlayComponent> = {
  component: LoadingOverlayComponent,
  title: 'Components / Loading Overlay',
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
};
