import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';

import { IconComponent } from '@kirbydesign/designsystem/icon';
import { CardComponent } from '@kirbydesign/designsystem/card';

// eslint-disable-next-line no-restricted-imports
import { renderOnSurfaces } from '../../.storybook/story-helpers';

import { IconExampleComponent } from '~/app/examples/icon-example/icon-example.component';

const meta: Meta<IconComponent> = {
  component: IconComponent,
  title: 'Components / Icon',
  decorators: [
    moduleMetadata({
      imports: [IconComponent, IconExampleComponent, CardComponent],
    }),
  ],
};
export default meta;
type Story = StoryObj<IconComponent>;

export const Default: Story = {
  args: {
    name: '',
  },
};

export const CookbookExamples: Story = {
  render: () => ({
    template: `<cookbook-icon-example></cookbook-icon-example>`,
  }),
};

const themeColors = [
  'default',
  'primary',
  'secondary',
  'tertiary',
  'success',
  'warning',
  'danger',
  'white-overlay',
  'light',
  'medium',
  'dark',
  'dark-overlay',
];

export const ThemeColors: Story = {
  render: renderOnSurfaces(
    `
    <p class="kirby-text-normal-bold">{{ surface }}</p>
    <div class="row">
      @for (themeColor of themeColors; track themeColor) {
        <div style="display: flex; flex-direction: column; align-items: center">
          <!-- The overlay colors are only available as classes, so all colors are set as classes -->
          <kirby-icon name="person" [class]="themeColor"></kirby-icon>
          <span class="kirby-text-xsmall">{{ themeColor }}</span>
        </div>
      }
    </div>
  `,
    '520px',
    { themeColors }
  ),
};
