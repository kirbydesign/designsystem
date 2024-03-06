import type { Meta, StoryObj } from '@storybook/angular';

import { moduleMetadata } from '@storybook/angular';

import { IconComponent } from '@kirbydesign/designsystem/icon';
import { AvatarComponent, AvatarSize } from './avatar.component';

const meta: Meta<AvatarComponent> = {
  component: AvatarComponent,
  title: 'AvatarComponent',
  decorators: [
    moduleMetadata({
      declarations: [IconComponent],
    }),
  ],
};
export default meta;
type Story = StoryObj<AvatarComponent>;

export const Default: Story = {
  args: {
    text: 'A',
    imageSrc: '',
    altText: '',
    stroke: false,
    overlay: false,
    size: AvatarSize.SM,
  },
};

export const Size: Story = {
  render: () => ({
    template: `
      <kirby-avatar size="xs" text="A"></kirby-avatar>
      <kirby-avatar size="sm" text="A"></kirby-avatar>
      <kirby-avatar size="md" text="A"></kirby-avatar>
      <kirby-avatar size="lg" text="A"></kirby-avatar>
    `,
  }),
};

export const ThemeColor: Story = {
  render: () => ({
    template: `
    <kirby-avatar themeColor="success" text="A"></kirby-avatar>
    <kirby-avatar themeColor="warning" text="A"></kirby-avatar>
    <kirby-avatar themeColor="danger" text="A"></kirby-avatar>
    <kirby-avatar themeColor="white" text="A"></kirby-avatar>
    `,
  }),
};
