import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';

import { AvatarComponent, AvatarSize } from '@kirbydesign/designsystem/avatar';

import { AvatarExampleComponent } from '~/app/examples/avatar-example/avatar-example.component';

const meta: Meta<AvatarComponent> = {
  component: AvatarComponent,
  decorators: [
    moduleMetadata({
      imports: [AvatarExampleComponent],
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

const officialColors = ['white', 'light'];
const backwardsCompatibilityColors = [
  'success',
  'warning',
  'danger',
  'primary',
  'secondary',
  'tertiary',
  'medium',
  'dark',
  'semi-light',
];

export const ColorVariants: Story = {
  render: () => ({
    props: { officialColors, backwardsCompatibilityColors },
    template: `
      <p class="kirby-text-normal">
        Only <strong>white</strong> and <strong>light</strong> are officially supported color
        variants (the ones that designers use). The remaining variants are kept for
        backwards compatibility and should not be used in new designs.
      </p>

      <h2 class="kirby-text-normal-bold">Official support</h2>
      <div class="color-grid">
        @for (color of officialColors; track color) {
          <div class="color-item">
            <kirby-avatar [themeColor]="color" [stroke]="true" text="A" size="md"></kirby-avatar>
            <span class="kirby-text-xsmall">{{ color }}</span>
          </div>
        }
      </div>

      <h2 class="kirby-text-normal-bold">Backwards compatibility</h2>
      <div class="color-grid">
        @for (color of backwardsCompatibilityColors; track color) {
          <div class="color-item">
            <kirby-avatar [themeColor]="color" text="A" size="md"></kirby-avatar>
            <span class="kirby-text-xsmall">{{ color }}</span>
          </div>
        }
      </div>
    `,
    styles: [
      `
      .color-grid {
        display: flex;
        flex-wrap: wrap;
        gap: var(--kirby-spacing-m);
        margin-bottom: var(--kirby-spacing-m);
      }
      .color-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: var(--kirby-spacing-xxs);
      }
    `,
    ],
  }),
};

export const CookbookExamples: Story = {
  render: () => ({
    template: `<cookbook-avatar-example></cookbook-avatar-example>`,
  }),
};
