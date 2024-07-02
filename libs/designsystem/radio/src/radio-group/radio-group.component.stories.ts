import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';

import { RadioGroupComponent, RadioModule } from '@kirbydesign/designsystem/radio';

const meta: Meta<RadioGroupComponent> = {
  component: RadioGroupComponent,
  title: 'Components / Radio',
  decorators: [
    moduleMetadata({
      imports: [RadioModule],
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
