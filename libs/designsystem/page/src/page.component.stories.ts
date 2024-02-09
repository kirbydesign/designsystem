import type { Meta, StoryObj } from '@storybook/angular';

import { PageComponent } from './page.component';

const meta: Meta<PageComponent> = {
  component: PageComponent,
  title: 'PageComponent',
};
export default meta;
type Story = StoryObj<PageComponent>;

export const Primary: Story = {
  args: {
    title: '',
    subtitle: '',
    toolbarTitle: '',
    titleAlignment: 'left',
    defaultBackHref: '',
    hideBackButton: false,
    titleMaxLines: 0,
    hasInteractiveTitle: false,
    // maxWidth: '',
    // tabBarBottomHidden: '',
  },
};
