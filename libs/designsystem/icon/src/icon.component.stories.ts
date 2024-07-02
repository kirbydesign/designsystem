import { type Meta, type StoryObj } from '@storybook/angular';
import { IconComponent } from '@kirbydesign/designsystem/icon';

const meta: Meta<IconComponent> = {
  component: IconComponent,
  title: 'Components / Icon',
  argTypes: {
    customName: {
      control: 'text',
    },
  },
};
export default meta;
type Story = StoryObj<IconComponent>;

export const Icon: Story = {
  args: {
    name: '',
  },
};
