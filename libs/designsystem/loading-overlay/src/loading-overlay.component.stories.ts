import type { Meta, StoryObj } from '@storybook/angular';
import { LoadingOverlayComponent } from '@kirbydesign/designsystem/loading-overlay';

const meta: Meta<LoadingOverlayComponent> = {
  component: LoadingOverlayComponent,
  title: 'LoadingOverlayComponent',
};
export default meta;
type Story = StoryObj<LoadingOverlayComponent>;

export const Default: Story = {
  args: {
    isLoading: true,
    showBackdrop: true,
    hideContent: false,
  },
};
