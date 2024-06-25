import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';

import { AvatarComponent, AvatarSize } from '@kirbydesign/designsystem/avatar';

import { AvatarExampleModule } from '~/app/examples/avatar-example/avatar-example.module';

const meta: Meta<AvatarComponent> = {
  component: AvatarComponent,
  decorators: [
    moduleMetadata({
      imports: [AvatarExampleModule],
    }),
  ],
  title: 'Components / Avatar',
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

export const CookbookExamples: Story = {
  render: () => ({
    template: `<cookbook-avatar-example></cookbook-avatar-example>`,
  }),
};
