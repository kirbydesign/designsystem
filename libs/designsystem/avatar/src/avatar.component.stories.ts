import type { Meta, StoryObj } from '@storybook/angular';

import {
  applicationConfig,
  argsToTemplate,
  componentWrapperDecorator,
  moduleMetadata,
} from '@storybook/angular';

import { importProvidersFrom } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { IconComponent } from '@kirbydesign/designsystem/icon';
import { AvatarComponent, AvatarSize } from './avatar.component';

const meta: Meta<AvatarComponent> = {
  component: AvatarComponent,
  title: 'AvatarComponent',
  decorators: [
    moduleMetadata({
      declarations: [IconComponent],
    }),
    applicationConfig({
      providers: [importProvidersFrom([IonicModule.forRoot()])],
    }),
    componentWrapperDecorator((story) => `<div style="padding: 1em;">${story}</div>`),
  ],
  render: (args: AvatarComponent) => ({
    props: {
      ...args,
    },
    template: `<kirby-avatar ${argsToTemplate(args)}>
  </kirby-avatar>
  <kirby-avatar>
    <kirby-icon name="kirby"></kirby-icon>
  </kirby-avatar>`,
  }),
};
export default meta;
type Story = StoryObj<AvatarComponent>;

export const Primary: Story = {
  args: {
    text: 'A',
    imageSrc: '',
    altText: '',
    stroke: false,
    overlay: false,
    size: AvatarSize.SM,
  },
};
