import { type Meta, type StoryObj } from '@storybook/angular';
import { IconComponent } from '@kirbydesign/designsystem/icon';

const meta: Meta<IconComponent> = {
  component: IconComponent,
  title: 'IconComponent',
  argTypes: {
    customName: {
      control: 'text',
    },
  },
};
export default meta;
type Story = StoryObj<IconComponent>;

export const Default: Story = {
  args: {
    name: '',
  },
};
