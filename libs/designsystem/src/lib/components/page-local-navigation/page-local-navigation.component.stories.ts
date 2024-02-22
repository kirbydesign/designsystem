import type { Meta, StoryObj } from '@storybook/angular';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { PageLocalNavigationComponent } from './page-local-navigation.component';

const meta: Meta<PageLocalNavigationComponent> = {
  component: PageLocalNavigationComponent,
  title: 'PageLocalNavigationComponent',
};
export default meta;
type Story = StoryObj<PageLocalNavigationComponent>;

export const TestGrid: Story = {
  args: {
    items: [],
    selectedIndex: 0,
  },
};

export const Heading: Story = {
  args: {
    items: [],
    selectedIndex: 0,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/page-local-navigation works!/gi)).toBeTruthy();
  },
};
