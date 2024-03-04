import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';

import { RadioModule } from '../radio-module';
import { RadioGroupComponent } from './radio-group.component';

const meta: Meta<RadioGroupComponent> = {
  component: RadioGroupComponent,
  title: 'RadioGroupComponent',
  decorators: [
    moduleMetadata({
      imports: [RadioModule],
    }),
  ],
};
export default meta;
type Story = StoryObj<RadioGroupComponent>;

export const Default: Story = {
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
