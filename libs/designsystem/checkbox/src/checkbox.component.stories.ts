import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';

import { CheckboxComponent } from '@kirbydesign/designsystem/checkbox';

import { CheckboxExampleModule } from '~/app/examples/checkbox-example/checkbox-example.module';

const meta: Meta<CheckboxComponent> = {
  component: CheckboxComponent,
  title: 'Components / Checkbox',
  decorators: [
    moduleMetadata({
      imports: [CheckboxExampleModule],
    }),
  ],
};
export default meta;
type Story = StoryObj<CheckboxComponent>;

export const Checkbox: Story = {
  args: {
    checked: false,
    attentionLevel: '2',
    text: 'Label',
    size: 'md',
    hasError: false,
    disabled: false,
  },
  argTypes: {
    attentionLevel: {
      options: ['1', '2'],
      control: { type: 'radio' },
    },
    size: {
      options: ['xs', 'sm', 'md'],
      control: { type: 'radio' },
    },
  },
};

export const CookbookExample: Story = {
  render: () => ({
    template: `<cookbook-checkbox-example></cookbook-checkbox-example>`,
  }),
};
