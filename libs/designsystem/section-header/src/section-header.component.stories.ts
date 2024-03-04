import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';

import { LabelComponent } from '@kirbydesign/designsystem/item';
import { SectionHeaderComponent } from './section-header.component';

const meta: Meta<SectionHeaderComponent> = {
  component: SectionHeaderComponent,
  title: 'SectionHeaderComponent',
  decorators: [
    moduleMetadata({
      declarations: [LabelComponent],
    }),
  ],
};
export default meta;
type Story = StoryObj<SectionHeaderComponent>;

export const Default: Story = {
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
