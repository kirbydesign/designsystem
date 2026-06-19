import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';

import { TestHelper } from '@kirbydesign/designsystem/testing';

import { CheckboxComponent } from '@kirbydesign/designsystem/checkbox';

import { CheckboxExampleComponent } from '~/app/examples/checkbox-example/checkbox-example.component';

const meta: Meta<CheckboxComponent> = {
  component: CheckboxComponent,
  title: 'Components / Checkbox',
  decorators: [
    moduleMetadata({
      imports: [CheckboxExampleComponent],
    }),
  ],
};
export default meta;
type Story = StoryObj<CheckboxComponent>;

export const Checkbox: Story = {
  args: {
    checked: false,
    indeterminate: false,
    attentionLevel: '2',
    text: 'Label',
    size: 'md',
    hasError: false,
    disabled: false,
  },
  argTypes: {
    attentionLevel: {
      options: ['1', '2'],
      control: { type: 'radio' },
    },
    size: {
      options: ['xs', 'sm', 'md'],
      control: { type: 'radio' },
    },
  },
};

export const CookbookExample: Story = {
  render: () => ({
    template: `<cookbook-checkbox-example></cookbook-checkbox-example>`,
  }),
};

export const Focused: Story = {
  args: {
    checked: false,
    text: 'Unchecked',
  },
  render: (args) => ({
    props: args,
    template: `
      <kirby-checkbox text="Unchecked"></kirby-checkbox>
      <kirby-checkbox text="Checked" [checked]="true"></kirby-checkbox>
    `,
    styles: [':host { display: flex; gap: 16px; padding: 8px; }'],
  }),
  play: async ({ canvasElement }) => {
    const checkbox = canvasElement.querySelector('ion-checkbox');
    await TestHelper.whenReady(checkbox);
    (checkbox as HTMLElement).focus();
  },
};
