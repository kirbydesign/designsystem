import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';
import { EmptyStateComponent, EmptyStateModule } from '@kirbydesign/designsystem/empty-state';

const meta: Meta<EmptyStateComponent> = {
  component: EmptyStateComponent,
  title: 'Components / Empty State',
  decorators: [
    moduleMetadata({
      imports: [EmptyStateModule],
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
