import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';

import { IconModule } from '@kirbydesign/designsystem/icon';
import { HeaderComponent, HeaderModule } from '@kirbydesign/designsystem/header';

const meta: Meta<HeaderComponent> = {
  component: HeaderComponent,
  title: 'HeaderComponent',
  decorators: [
    moduleMetadata({
      imports: [HeaderModule, IconModule],
    }),
  ],
};
export default meta;
type Story = StoryObj<HeaderComponent>;

export const Default: Story = {
  args: {
    title: 'Title',
    value: '',
    valueUnit: '',
    subtitle1: 'Subtitle',
    subtitle2: '',
    hasInteractiveTitle: false,
    centered: false,
    titleMaxLines: 0,
    emphasizeActions: false,
  },
};
