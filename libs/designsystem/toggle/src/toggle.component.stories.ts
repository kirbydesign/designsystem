import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { CardComponent } from '@kirbydesign/designsystem/card';
import { ToggleComponent } from '@kirbydesign/designsystem/toggle';
import { TestHelper } from '@kirbydesign/designsystem/testing';
// eslint-disable-next-line no-restricted-imports
import {
  idsOnSurfaces,
  interactionStates,
  pseudoStatesFor,
  renderOnSurfaces,
} from '../../.storybook/story-helpers';

const meta: Meta<ToggleComponent> = {
  component: ToggleComponent,
  title: 'Components / Toggle',
  decorators: [
    moduleMetadata({
      imports: [CardComponent, ToggleComponent],
    }),
  ],
};
export default meta;
type Story = StoryObj<ToggleComponent>;

export const Toggle: Story = {
  args: {
    checked: false,
    disabled: false,
  },
};

export const Focused: Story = {
  args: {
    checked: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <kirby-toggle></kirby-toggle>
      <kirby-toggle [checked]="true"></kirby-toggle>
    `,
    styles: [':host { display: flex; gap: 16px; padding: 8px; }'],
  }),
  play: async ({ canvasElement }) => {
    const toggle = canvasElement.querySelector('ion-toggle');
    await TestHelper.whenReady(toggle);
    (toggle as HTMLElement).focus();
  },
};

const toggleVariants: { id: string; label: string; checked?: boolean }[] = [
  { id: 'unchecked', label: 'Unchecked' },
  { id: 'checked', label: 'Checked', checked: true },
];

// Disabled toggles can't be interacted with, so disabled is shown as a state of its own
const toggleStates = [...interactionStates, 'disabled'] as const;

export const InteractionStates: Story = {
  parameters: {
    pseudo: pseudoStatesFor(
      idsOnSurfaces(
        'toggle',
        toggleVariants.map((variant) => variant.id)
      ),
      'ion-toggle'
    ),
  },
  render: renderOnSurfaces(
    `
    <p class="kirby-text-normal-bold">{{ surface }}</p>
    @for (variant of variants; track variant.id) {
      <p class="kirby-text-small-light">{{ variant.label }}</p>
      <div class="row">
        @for (state of states; track state) {
          <kirby-toggle
            [attr.id]="'toggle-' + surface + '-' + variant.id + '-' + state"
            [checked]="variant.checked"
            [disabled]="state === 'disabled'"
          >
            {{ state }}
          </kirby-toggle>
        }
      </div>
    }
  `,
    'max-content',
    { variants: toggleVariants, states: toggleStates },
    { stacked: true }
  ),
};
