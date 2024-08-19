import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';

import { RadioGroupComponent, RadioModule } from '@kirbydesign/designsystem/radio';

import { RadioExampleModule } from '~/app/examples/radio-example/radio-example.module';

const meta: Meta<RadioGroupComponent> = {
  component: RadioGroupComponent,
  title: 'Components / Radio',
  decorators: [
    moduleMetadata({
      imports: [RadioModule, RadioExampleModule],
    }),
  ],
};
export default meta;
type Story = StoryObj<RadioGroupComponent>;

export const Radio: Story = {
  args: {
    disabled: false,
    hasError: false,
    items: ['Bacon', 'Salami', 'Tenderloin'],
    itemTextProperty: 'text',
    itemDisabledProperty: 'disabled',
    selectedIndex: -1,
    value: '',
  },
};

export const CookbookExample: Story = {
  render: () => ({
    template: `<cookbook-radio-example></cookbook-radio-example>`,
  }),
};
