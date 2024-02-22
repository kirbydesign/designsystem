import {
  applicationConfig,
  argsToTemplate,
  type Meta,
  moduleMetadata,
  type StoryObj,
} from '@storybook/angular';

import { IonicModule } from '@ionic/angular';
import { importProvidersFrom } from '@angular/core';
import { CheckboxComponent } from './checkbox.component';

const meta: Meta<CheckboxComponent> = {
  component: CheckboxComponent,
  title: 'CheckboxComponent',
  decorators: [
    moduleMetadata({
      imports: [IonicModule],
    }),
    applicationConfig({
      providers: [importProvidersFrom([IonicModule.forRoot()])],
    }),
  ],
};
export default meta;
type Story = StoryObj<CheckboxComponent>;

export const TestGrid: Story = {
  args: {
    checked: false,
    attentionLevel: '2',
    text: 'label',
    size: 'md',
    hasError: false,
    disabled: false,
  },
  render: (args: CheckboxComponent) => ({
    props: args,
    template: `
      <kirby-checkbox ${argsToTemplate(args)} text="Chekcbox">
      </kirby-checkbox>`,
  }),
};
