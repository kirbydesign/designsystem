import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';
import { EmptyStateComponent } from './empty-state.component';
import { EmptyStateModule } from './empty-state.module';

const meta: Meta<EmptyStateComponent> = {
  component: EmptyStateComponent,
  title: 'EmptyStateComponent',
  decorators: [
    moduleMetadata({
      imports: [EmptyStateModule],
    }),
  ],
};
export default meta;
type Story = StoryObj<EmptyStateComponent>;

export const Default: Story = {
  args: {
    iconName: 'kirby',
    title: 'No items',
    subtitle: `You don't have any items. Call support to add some items to your account.`,
  },
  argTypes: {
    customIconName: {
      control: 'text',
    },
  },
};
