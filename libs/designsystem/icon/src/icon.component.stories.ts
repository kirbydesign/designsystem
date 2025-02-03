import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';

import { IconComponent, IconModule } from '@kirbydesign/designsystem/icon';

import { IconExampleComponent } from '~/app/examples/icon-example/icon-example.component';

const meta: Meta<IconComponent> = {
  component: IconComponent,
  title: 'Components / Icon',
  decorators: [
    moduleMetadata({
      imports: [IconModule, IconExampleComponent],
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
