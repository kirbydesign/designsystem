import type { Meta, StoryObj } from '@storybook/angular';

import { BannerComponent } from '@kirbydesign/extensions-angular/banner';

const meta: Meta<BannerComponent> = {
  component: BannerComponent,
  title: 'Components/Banner',
};
export default meta;
type Story = StoryObj<BannerComponent>;

export const Primary: Story = {};

export const Title: Story = {
  args: {
    title: 'Example title',
  },
};
