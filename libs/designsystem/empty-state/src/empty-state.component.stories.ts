import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';
import { EmptyStateComponent, EmptyStateModule } from '@kirbydesign/designsystem/empty-state';
import { EmptyStateExampleModule } from '~/app/examples/empty-state-example/empty-state-example.module';

const meta: Meta<EmptyStateComponent> = {
  component: EmptyStateComponent,
  title: 'Components / Empty State',
  decorators: [
    moduleMetadata({
      imports: [EmptyStateModule, EmptyStateExampleModule],
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
