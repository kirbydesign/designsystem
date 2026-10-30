import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';

import { CardComponent } from '@kirbydesign/designsystem/card';
import { RadioComponent, RadioGroupComponent } from '@kirbydesign/designsystem/radio';
// eslint-disable-next-line no-restricted-imports
import {
  idsOnSurfaces,
  interactionStates,
  pseudoStatesFor,
  renderOnSurfaces,
} from '../../.storybook/story-helpers';

const meta: Meta<RadioComponent> = {
  component: RadioComponent,
  title: 'Components / Radio',
  decorators: [
    moduleMetadata({
      imports: [CardComponent, RadioComponent, RadioGroupComponent],
    }),
  ],
};
export default meta;
type Story = StoryObj<RadioComponent>;

const radioVariants: { id: string; label: string; selected?: boolean; hasError?: boolean }[] = [
  { id: 'unselected', label: 'Unselected' },
  { id: 'selected', label: 'Selected', selected: true },
  { id: 'error', label: 'Error', hasError: true },
];

// Disabled radios can't be interacted with, so disabled is shown as a state of its own
const radioStates = [...interactionStates, 'disabled'] as const;

export const InteractionStates: Story = {
  parameters: {
    pseudo: pseudoStatesFor(
      idsOnSurfaces(
        'radio',
        radioVariants.map((variant) => variant.id)
      ),
      'ion-radio'
    ),
  },
  render: renderOnSurfaces(
    `
    <p class="kirby-text-normal-bold">{{ surface }}</p>
    @for (variant of variants; track variant.id) {
      <p class="kirby-text-small-light">{{ variant.label }}</p>
      <div class="row">
        @for (state of states; track state) {
          <kirby-radio-group
            [value]="variant.selected ? 'option' : null"
            [hasError]="variant.hasError"
          >
            <kirby-radio
              [attr.id]="'radio-' + surface + '-' + variant.id + '-' + state"
              value="option"
              [text]="state"
              [disabled]="state === 'disabled'"
            ></kirby-radio>
          </kirby-radio-group>
        }
      </div>
    }
  `,
    'max-content',
    { variants: radioVariants, states: radioStates },
    { stacked: true }
  ),
};
