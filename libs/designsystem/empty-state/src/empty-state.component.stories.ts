import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';
import { EmptyStateComponent } from '@kirbydesign/designsystem/empty-state';
import { CardComponent } from '@kirbydesign/designsystem/card';
import { ThemeColorDirective } from '@kirbydesign/designsystem/shared';
// eslint-disable-next-line no-restricted-imports
import { renderOnSurfaces } from '../../.storybook/story-helpers';
import { EmptyStateExampleComponent } from '~/app/examples/empty-state-example/empty-state-example.component';

const meta: Meta<EmptyStateComponent> = {
  component: EmptyStateComponent,
  title: 'Components / Empty State',
  decorators: [
    moduleMetadata({
      imports: [
        EmptyStateComponent,
        EmptyStateExampleComponent,
        CardComponent,
        ThemeColorDirective,
      ],
    }),
  ],
};
export default meta;
type Story = StoryObj<EmptyStateComponent>;

export const EmptyState: Story = {
  args: {
    iconName: 'kirby',
    title: 'No items',
    subtitle: `You don't have any items. Call support to add some items to your account.`,
  },
};

export const CookbookExample: Story = {
  render: () => ({
    template: `<cookbook-empty-state-example></cookbook-empty-state-example>`,
  }),
};

export const ThemeColors: Story = {
  render: renderOnSurfaces(
    `
    @for (themeColor of themeColors; track themeColor) {
      <kirby-empty-state
        iconName="kirby"
        [themeColor]="themeColor"
        [title]="(themeColor ?? 'default') + ', ' + surface"
        subtitle="Subtitle"
      ></kirby-empty-state>
    }
  `,
    '320px',
    { themeColors: [undefined, 'success', 'warning', 'danger', 'medium'] }
  ),
};
