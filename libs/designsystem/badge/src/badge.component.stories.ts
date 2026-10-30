import { argsToTemplate, type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';

import { ThemeColor } from '@kirbydesign/core';

import { IconComponent } from '@kirbydesign/designsystem/icon';
import { BadgeComponent } from '@kirbydesign/designsystem/badge';
import { CardComponent } from '@kirbydesign/designsystem/card';

// eslint-disable-next-line no-restricted-imports
import { renderOnSurfaces } from '../../.storybook/story-helpers';
import { BadgeExampleComponent } from '~/app/examples/badge-example/badge-example.component';

type BadgeProps = BadgeComponent & {
  themeColor?: ThemeColor;
};

const meta: Meta<BadgeProps> = {
  component: BadgeComponent,
  decorators: [
    moduleMetadata({
      imports: [IconComponent, BadgeExampleComponent, CardComponent],
    }),
  ],
  title: 'Components / Badge',
};
export default meta;
type Story = StoryObj<BadgeProps>;

export const Default: Story = {
  args: {
    text: 'Badge',
  },
  argTypes: {
    themeColor: {
      options: ['white', 'success', 'warning', 'danger'],
      control: { type: 'radio' },
    },
    size: {
      options: ['sm', 'md'],
      control: { type: 'radio' },
    },
  },
  render: (args) => ({
    props: args,
    template: `
    <kirby-badge ${argsToTemplate(args)}></kirby-badge>`,
  }),
};

export const CookbookExamples: Story = {
  render: () => ({
    template: `<cookbook-badge-example></cookbook-badge-example>`,
  }),
};

export const Surfaces: Story = {
  render: renderOnSurfaces(
    `
    <p class="kirby-text-normal">{{ surface }}</p>
    @for (size of sizes; track size) {
      <div style="display: flex; gap: var(--kirby-spacing-s); align-items: center; margin-block: var(--kirby-spacing-xs)">
        @for (themeColor of themeColors; track themeColor) {
          <kirby-badge [themeColor]="themeColor" [size]="size">
            @if (size === 'md') {
              2
            }
          </kirby-badge>
          @if (size === 'md') {
            <kirby-badge [themeColor]="themeColor">
              <kirby-icon name="attach"></kirby-icon>
            </kirby-badge>
          }
        }
      </div>
    }
  `,
    '320px',
    { sizes: ['sm', 'md'], themeColors: ['white', 'success', 'warning', 'danger'] }
  ),
};
