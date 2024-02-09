import type { Meta, StoryObj } from '@storybook/angular';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { PageFooterComponent } from './page-footer.component';

const meta: Meta<PageFooterComponent> = {
  component: PageFooterComponent,
  title: 'PageFooterComponent',
};
export default meta;
type Story = StoryObj<PageFooterComponent>;

export const Primary: Story = {
  args: {
    hasPadding: true,
  },
};

export const Heading: Story = {
  args: {
    hasPadding: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/page-footer works!/gi)).toBeTruthy();
  },
};
