import type { Meta, StoryObj } from '@storybook/angular';

import { argsToTemplate, moduleMetadata } from '@storybook/angular';
import { within } from 'storybook/test';
import { ButtonComponent, ButtonSize } from '@kirbydesign/designsystem/button';

import { ButtonExampleComponent } from '~/app/examples/button-example/button-example.component';

const meta: Meta<ButtonComponent> = {
  component: ButtonComponent,
  title: 'Components / Button',
  decorators: [
    moduleMetadata({
      imports: [ButtonExampleComponent],
    }),
  ],
};
export default meta;
type Story = StoryObj<ButtonComponent>;

export const Button: Story = {
  args: {
    noDecoration: false,
    isFloating: false,
    size: ButtonSize.MD,
    showIconOnly: false,
    attentionLevel: '1',
  },
  argTypes: {
    attentionLevel: {
      options: ['1', '2', '3'],
      control: { type: 'radio' },
    },
    size: {
      options: Object.values(ButtonSize),
      control: { type: 'radio' },
    },
  },
  render: (args) => ({
    props: args,
    template: `
      <button kirby-button ${argsToTemplate(args)}>Default</button>
    `,
  }),
};

export const CookbookExample: Story = {
  render: () => ({
    template: `<cookbook-button-example></cookbook-button-example>`,
  }),
};

export const Focused: Story = {
  render: () => ({
    template: `
      <button kirby-button attentionLevel="1">Attention Level 1</button>
      <button kirby-button attentionLevel="2">Attention Level 2</button>
      <button kirby-button attentionLevel="3">Attention Level 3</button>
    `,
    styles: [':host { display: flex; gap: 8px; }'],
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const buttons = canvas.getAllByRole('button');
    buttons[0].focus();
  },
};
