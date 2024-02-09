import {
  applicationConfig,
  argsToTemplate,
  componentWrapperDecorator,
  type Meta,
  moduleMetadata,
  type StoryObj,
} from '@storybook/angular';

import { ButtonComponent } from '@kirbydesign/designsystem/button';
import { importProvidersFrom } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { IconModule } from '@kirbydesign/designsystem/icon';
import { ActionGroupComponent } from './action-group.component';

const meta: Meta<ActionGroupComponent> = {
  component: ActionGroupComponent,
  title: 'ActionGroupComponent',
  decorators: [
    moduleMetadata({
      imports: [ButtonComponent, IconModule],
    }),
    applicationConfig({
      providers: [importProvidersFrom([IonicModule.forRoot()])],
    }),
    componentWrapperDecorator((story) => `<div style="padding: 1em;">${story}</div>`),
  ],
  render: (args: ActionGroupComponent) => ({
    props: {
      ...args,
    },
    template: `<kirby-action-group ${argsToTemplate(args)}>
    <button kirby-button attentionLevel="3">
      <kirby-icon name="edit"></kirby-icon>
      <span class="text">Action 1</span>
    </button>
    <button kirby-button attentionLevel="3">
      Action 2
    </button>
    <button kirby-button attentionLevel="3">
      Action 3
    </button>
  </kirby-action-group>`,
  }),
};
export default meta;
type Story = StoryObj<ActionGroupComponent>;

export const Primary: Story = {
  args: {
    visibleActions: 2,
    align: 'end',
  },
};
