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
      <kirby-loading-overlay [isLoading]="true" [showBackdrop]="true" [hideContent]="false">
        <div style="height: 800px; overflow-y: auto;">
          @for (item of items; track item) {
            <p>Scrollable content line {{ item }}</p>
          }
        </div>
      </kirby-loading-overlay>
    `,
    props: {
      items: Array.from({ length: 50 }, (_, index) => index + 1),
    },
  }),
};
