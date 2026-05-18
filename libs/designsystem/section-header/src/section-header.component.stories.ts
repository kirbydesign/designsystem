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
    <h1 heading>Section Header</h1>
    <p detail slot="end">With detail</p>
  </kirby-section-header>`,
  }),
};

export const SectionHeaderWithMultilineContent: Story = {
  args: {},
  render: () => ({
    template: `<kirby-section-header>
    <kirby-label>
      <h1 heading>Section Header</h1>
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

export const SectionHeaderHeadingTypography: Story = {
  render: () => ({
    template: `
      <kirby-section-header>
        <h2 heading>Large (h2)</h2>
      </kirby-section-header>

      <kirby-section-header>
        <p heading class="kirby-text-large">Large (.kirby-text-large)</p>
      </kirby-section-header>

      <kirby-section-header>
        <h3 heading>Medium (h3)</h3>
      </kirby-section-header>

      <kirby-section-header>
        <h2 heading class="kirby-text-medium">Medium (.kirby-text-medium on h2)</h2>
      </kirby-section-header>

      <kirby-section-header>
        <h4 heading>Normal (h4)</h4>
      </kirby-section-header>

      <kirby-section-header>
        <h5 heading>Normal (h5)</h5>
      </kirby-section-header>

      <kirby-section-header>
        <h6 heading>Normal (h6)</h6>
      </kirby-section-header>

      <kirby-section-header>
        <p heading class="kirby-text-normal">Normal (.kirby-text-normal)</p>
      </kirby-section-header>
    `,
  }),
};

export const SectionHeaderHeadingTypographyWithLabel: Story = {
  render: () => ({
    template: `
      <kirby-section-header>
        <kirby-label>
          <p heading>Default heading</p>
          <p label>Label</p>
          <p detail>Detail</p>
        </kirby-label>
      </kirby-section-header>

      <kirby-section-header>
        <kirby-label>
          <h2 heading>Large (h2)</h2>
          <p label>Label</p>
        </kirby-label>
      </kirby-section-header>

      <kirby-section-header>
        <kirby-label>
          <p heading class="kirby-text-large">Large (.kirby-text-large)</p>
          <p label>Label</p>
        </kirby-label>
      </kirby-section-header>

      <kirby-section-header>
        <kirby-label>
          <h3 heading>Medium (h3)</h3>
          <p label>Label</p>
        </kirby-label>
      </kirby-section-header>

      <kirby-section-header>
        <kirby-label>
          <h2 heading class="kirby-text-medium">Medium (.kirby-text-medium on h2)</h2>
          <p label>Label</p>
        </kirby-label>
      </kirby-section-header>

      <kirby-section-header>
        <kirby-label>
          <h4 heading>Normal (h4)</h4>
          <p label>Label</p>
        </kirby-label>
      </kirby-section-header>

      <kirby-section-header>
        <kirby-label>
          <h5 heading>Normal (h5)</h5>
          <p label>Label</p>
        </kirby-label>
      </kirby-section-header>

      <kirby-section-header>
        <kirby-label>
          <h6 heading>Normal (h6)</h6>
          <p label>Label</p>
        </kirby-label>
      </kirby-section-header>

      <kirby-section-header>
        <kirby-label>
          <p heading class="kirby-text-normal">Normal (.kirby-text-normal)</p>
          <p label>Label</p>
        </kirby-label>
      </kirby-section-header>
    `,
  }),
};
