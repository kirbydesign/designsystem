import { applicationConfig, type Meta, type StoryObj } from '@storybook/angular';

import { importProvidersFrom } from '@angular/core';
import { KirbyIonicModule } from '@kirbydesign/designsystem/kirby-ionic-module';
import { CheckboxComponent } from './checkbox.component';

const meta: Meta<CheckboxComponent> = {
  component: CheckboxComponent,
  title: 'CheckboxComponent',
  decorators: [
    applicationConfig({
      providers: [importProvidersFrom(KirbyIonicModule)],
    }),
  ],
};
export default meta;
type Story = StoryObj<CheckboxComponent>;

export const Default: Story = {
  args: {
    checked: false,
    attentionLevel: '2',
    text: 'Label',
    size: 'md',
    hasError: false,
    disabled: false,
  },
};
