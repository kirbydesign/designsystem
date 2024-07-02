import { argsToTemplate, type Meta, type StoryObj } from '@storybook/angular';
import { FlagComponent } from '@kirbydesign/designsystem/flag';

const meta: Meta<FlagComponent> = {
  component: FlagComponent,
  title: 'Components / Flag',
};
export default meta;
type Story = StoryObj<FlagComponent>;

export const Flag: Story = {
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
