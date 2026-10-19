import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';

import { TestHelper } from '@kirbydesign/designsystem/testing';

import { CardComponent } from '@kirbydesign/designsystem/card';
import { CheckboxComponent } from '@kirbydesign/designsystem/checkbox';

// eslint-disable-next-line no-restricted-imports
import {
  idsOnSurfaces,
  interactionStates,
  pseudoStatesFor,
  renderOnSurfaces,
} from '../../.storybook/story-helpers';
import { CheckboxExampleComponent } from '~/app/examples/checkbox-example/checkbox-example.component';

const meta: Meta<CheckboxComponent> = {
  component: CheckboxComponent,
  title: 'Components / Checkbox',
  decorators: [
    moduleMetadata({
      imports: [CheckboxExampleComponent, CardComponent],
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

const checkboxVariants: {
  id: string;
  label: string;
  checked?: boolean;
  attentionLevel?: '1' | '2';
  hasError?: boolean;
}[] = [
  { id: 'unchecked', label: 'Unchecked' },
  { id: 'checked', label: 'Checked', checked: true },
  {
    id: 'checked-level-1',
    label: 'Checked, attention level 1',
    checked: true,
    attentionLevel: '1',
  },
  // Error is a variant rather than a state, so it's shown in every interaction state.
  // This guards the rule order that keeps the error border over hover and active,
  // and the focus ring over the error.
  { id: 'error', label: 'Error', hasError: true },
];

// Disabled checkboxes can't be interacted with, so disabled is shown as a state of its own
const checkboxStates = [...interactionStates, 'disabled'] as const;

export const InteractionStates: Story = {
  parameters: {
    pseudo: pseudoStatesFor(
      idsOnSurfaces(
        'checkbox',
        checkboxVariants.map((variant) => variant.id)
      ),
      'ion-checkbox'
    ),
  },
  render: renderOnSurfaces(
    `
    <p class="kirby-text-normal-bold">{{ surface }}</p>
    @for (variant of variants; track variant.id) {
      <p class="kirby-text-small-light">{{ variant.label }}</p>
      <div class="row">
        @for (state of states; track state) {
          <kirby-checkbox
            [attr.id]="'checkbox-' + surface + '-' + variant.id + '-' + state"
            [text]="state"
            [checked]="variant.checked"
            [attentionLevel]="variant.attentionLevel ?? '2'"
            [hasError]="variant.hasError"
            [disabled]="state === 'disabled'"
          ></kirby-checkbox>
        }
      </div>
    }
  `,
    'max-content',
    { variants: checkboxVariants, states: checkboxStates },
    { stacked: true }
  ),
};
