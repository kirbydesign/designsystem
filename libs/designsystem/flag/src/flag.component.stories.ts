import { argsToTemplate, type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';
import { FlagComponent } from '@kirbydesign/designsystem/flag';

import { FlagExampleComponent } from '~/app/examples/flag-example/flag-example.component';

const meta: Meta<FlagComponent> = {
  component: FlagComponent,
  title: 'Components / Flag',
  decorators: [
    moduleMetadata({
      imports: [FlagExampleComponent],
    }),
  ],
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
  render: (args) => ({
    props: args,
    template: `<kirby-flag ${argsToTemplate(args)}>Flag</kirby-flag>
  `,
  }),
};

export const CookbookExample: Story = {
  render: () => ({
    template: `<cookbook-flag-example></cookbook-flag-example>`,
  }),
};
