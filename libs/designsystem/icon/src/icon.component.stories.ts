import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';

import { IconComponent, IconModule } from '@kirbydesign/designsystem/icon';

import { IconExampleModule } from '~/app/examples/icon-example/icon-example.module';

const meta: Meta<IconComponent> = {
  component: IconComponent,
  title: 'Components / Icon',
  decorators: [
    moduleMetadata({
      imports: [IconModule, IconExampleModule],
    }),
  ],
};
export default meta;
type Story = StoryObj<IconComponent>;

export const Default: Story = {
  args: {
    name: '',
  },
};

export const CookbookExamples: Story = {
  render: () => ({
    template: `<cookbook-icon-example></cookbook-icon-example>`,
  }),
};
