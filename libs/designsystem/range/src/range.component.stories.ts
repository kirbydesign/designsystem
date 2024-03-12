import { applicationConfig, type Meta, type StoryObj } from '@storybook/angular';

import { importProvidersFrom } from '@angular/core';
import { KirbyIonicModule } from '@kirbydesign/designsystem/kirby-ionic-module';
import { RangeComponent } from './range.component';

const meta: Meta<RangeComponent> = {
  component: RangeComponent,
  title: 'RangeComponent',
  decorators: [
    applicationConfig({
      providers: [importProvidersFrom(KirbyIonicModule)],
    }),
  ],
};
export default meta;
type Story = StoryObj<RangeComponent>;

export const Default: Story = {
  args: {
    value: 0,
    step: 1,
    min: 0,
    max: 100,
    minLabel: '',
    maxLabel: '',
    debounce: 0,
    pin: false,
    ticks: false,
    disabled: false,
  },
  argTypes: {
    min: {
      type: 'number',
    },
    max: {
      type: 'number',
    },
  },
};
