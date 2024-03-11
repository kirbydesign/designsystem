import {
  applicationConfig,
  argsToTemplate,
  type Meta,
  moduleMetadata,
  type StoryObj,
} from '@storybook/angular';

import { ButtonComponent } from '@kirbydesign/designsystem/button';
import { IconModule } from '@kirbydesign/designsystem/icon';
import { importProvidersFrom } from '@angular/core';
import { KirbyIonicModule } from '@kirbydesign/designsystem/kirby-ionic-module';
import { ActionGroupComponent } from './action-group.component';

const meta: Meta<ActionGroupComponent> = {
  component: ActionGroupComponent,
  title: 'ActionGroupComponent',
  decorators: [
    moduleMetadata({
      imports: [ButtonComponent, IconModule],
    }),
    applicationConfig({
      providers: [importProvidersFrom(KirbyIonicModule)],
    }),
  ],
};
export default meta;
type Story = StoryObj<ActionGroupComponent>;

export const Default: Story = {
  args: {
    visibleActions: 2,
    align: 'end',
  },
  render: (args: ActionGroupComponent) => ({
    props: args,
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
