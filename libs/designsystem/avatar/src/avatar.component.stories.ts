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
  argTypes: {
    themeColor: {
      options: [
        'success',
        'warning',
        'danger',
        'primary',
        'secondary',
        'tertiary',
        'medium',
        'white',
        'dark',
        'light',
        'semi-light',
      ],
      control: { type: 'radio' },
    },
    size: {
      options: Object.values(AvatarSize),
      control: { type: 'radio' },
    },
  },
};

export const CookbookExamples: Story = {
  render: () => ({
    template: `<cookbook-avatar-example></cookbook-avatar-example>`,
  }),
};
