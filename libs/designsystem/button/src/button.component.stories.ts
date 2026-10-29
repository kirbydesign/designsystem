import type { Meta, StoryObj } from '@storybook/angular';

import { argsToTemplate, moduleMetadata } from '@storybook/angular';
import { within } from 'storybook/test';
import { AttentionLevel, ButtonComponent, ButtonSize } from '@kirbydesign/designsystem/button';
import { CardComponent } from '@kirbydesign/designsystem/card';

// eslint-disable-next-line no-restricted-imports
import {
  idsOnSurfaces,
  interactionStates,
  pseudoStatesFor,
  renderOnSurfaces,
} from '../../.storybook/story-helpers';
import { ButtonExampleComponent } from '~/app/examples/button-example/button-example.component';

const meta: Meta<ButtonComponent> = {
  component: ButtonComponent,
  title: 'Components / Button',
  decorators: [
    moduleMetadata({
      imports: [ButtonExampleComponent, CardComponent],
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
    styles: [':host { display: flex; gap: 8px; padding: 8px; }'],
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const buttons = canvas.getAllByRole('button');
    buttons[0].focus();
  },
};

const buttonVariants: {
  id: string;
  label: string;
  attentionLevel?: AttentionLevel;
  noDecoration?: boolean;
  destructive?: boolean;
}[] = [
  { id: 'level-1', label: 'Attention level 1', attentionLevel: '1' },
  { id: 'level-2', label: 'Attention level 2', attentionLevel: '2' },
  { id: 'level-3', label: 'Attention level 3', attentionLevel: '3' },
  { id: 'no-decoration', label: 'No decoration', noDecoration: true },
  // Only applied by kirby-alert
  { id: 'destructive', label: 'Destructive', attentionLevel: '1', destructive: true },
];

// Disabled buttons can't be interacted with, so disabled is shown as a state of its own
const buttonStates = [...interactionStates, 'disabled'] as const;

export const InteractionStates: Story = {
  parameters: {
    pseudo: pseudoStatesFor(
      idsOnSurfaces(
        'button',
        buttonVariants.map((variant) => variant.id)
      )
    ),
  },
  render: renderOnSurfaces(
    `
    <p class="kirby-text-normal-bold">{{ surface }}</p>
    @for (variant of variants; track variant.id) {
      <p class="kirby-text-small-light">{{ variant.label }}</p>
      <div class="row">
        @for (state of states; track state) {
          <button
            kirby-button
            [attr.id]="'button-' + surface + '-' + variant.id + '-' + state"
            [attentionLevel]="variant.attentionLevel"
            [noDecoration]="variant.noDecoration"
            [class.destructive]="variant.destructive"
            [disabled]="state === 'disabled'"
          >
            {{ state }}
          </button>
        }
      </div>
    }
  `,
    'max-content',
    { variants: buttonVariants, states: buttonStates },
    { stacked: true }
  ),
};
