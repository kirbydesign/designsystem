import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';

import { ItemModule } from '@kirbydesign/designsystem/item';
import { SectionHeaderComponent } from '@kirbydesign/designsystem/section-header';

const meta: Meta<SectionHeaderComponent> = {
  component: SectionHeaderComponent,
  title: 'Components / Section Header',
  decorators: [
    moduleMetadata({
      imports: [ItemModule],
    }),
  ],
};
export default meta;
type Story = StoryObj<SectionHeaderComponent>;

export const SectionHeader: Story = {
  args: {},
  render: () => ({
    template: `<kirby-section-header>
    <kirby-label>
      <h3 heading>Section Header</h3>
      <p label>With a label</p>
    </kirby-label>
  </kirby-section-header>`,
  }),
};
