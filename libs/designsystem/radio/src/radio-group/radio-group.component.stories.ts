import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';

import { RadioGroupComponent, RadioModule } from '@kirbydesign/designsystem/radio';

import { RadioExampleComponent } from '~/app/examples/radio-example/radio-example.component';

const meta: Meta<RadioGroupComponent> = {
  component: RadioGroupComponent,
  title: 'Components / Radio',
  decorators: [
    moduleMetadata({
      imports: [RadioModule, RadioExampleComponent],
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
