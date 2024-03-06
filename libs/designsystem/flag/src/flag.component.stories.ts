import { argsToTemplate, type Meta, type StoryObj } from '@storybook/angular';
import { FlagComponent } from './flag.component';

const meta: Meta<FlagComponent> = {
  component: FlagComponent,
  title: 'FlagComponent',
};
export default meta;
type Story = StoryObj<FlagComponent>;

export const Default: Story = {
  args: {
    size: 'md',
    themeColor: 'transparent',
  },
  argTypes: {
    themeColor: {
      options: ['white', 'success', 'warning', 'danger'],
      control: { type: 'radio' },
    },
  },
  render: (args: FlagComponent) => ({
    props: args,
    template: `<kirby-flag ${argsToTemplate(args)}>Flag</kirby-flag>
  `,
  }),
};
