import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';

import { LabelComponent } from '@kirbydesign/designsystem/item';
import { SectionHeaderComponent } from '@kirbydesign/designsystem/section-header';

import { SectionHeaderExampleComponent } from '~/app/examples/section-header-example/section-header-example.component';

const meta: Meta<SectionHeaderComponent> = {
  component: SectionHeaderComponent,
  title: 'Components / Section Header',
  decorators: [
    moduleMetadata({
      imports: [LabelComponent, SectionHeaderExampleComponent],
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

export const CookbookExample: Story = {
  render: () => ({
    template: `<cookbook-section-header-example></cookbook-section-header-example>`,
  }),
};
