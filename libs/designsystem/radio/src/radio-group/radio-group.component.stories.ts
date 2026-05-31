import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';

import { RadioComponent, RadioGroupComponent } from '@kirbydesign/designsystem/radio';
import { TestHelper } from '@kirbydesign/designsystem/testing';

import { RadioExampleComponent } from '~/app/examples/radio-example/radio-example.component';

const meta: Meta<RadioGroupComponent> = {
  component: RadioGroupComponent,
  title: 'Components / Radio',
  decorators: [
    moduleMetadata({
      imports: [RadioComponent, RadioExampleComponent],
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

export const Focused: Story = {
  args: {
    items: ['Bacon', 'Salami', 'Tenderloin'],
    selectedIndex: 0,
  },
  play: async ({ canvasElement }) => {
    const radio = canvasElement.querySelector('ion-radio');
    await TestHelper.whenReady(radio);
    (radio as HTMLElement).focus();
  },
};
