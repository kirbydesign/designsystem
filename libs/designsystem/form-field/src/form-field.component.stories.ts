import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';
import { userEvent, within } from 'storybook/test';

import {
  FormFieldComponent,
  FormFieldModule,
  InputComponent,
  TextareaComponent,
} from '@kirbydesign/designsystem/form-field';

import { CardComponent, IconComponent } from '@kirbydesign/designsystem';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
// eslint-disable-next-line no-restricted-imports
import {
  idsOnSurfaces,
  interactionStates,
  pseudoStatesFor,
  renderOnSurfaces,
} from '../../.storybook/story-helpers';
import { FormFieldExampleComponent } from '~/app/examples/form-field-example/form-field-example.component';

const meta: Meta<FormFieldComponent> = {
  component: FormFieldComponent,
  title: 'Components / FormField',
  decorators: [
    moduleMetadata({
      imports: [
        FormFieldModule,
        InputComponent,
        TextareaComponent,
        FormFieldExampleComponent,
        IconComponent,
        CardComponent,
      ],
    }),
  ],
};
export default meta;
type Story = StoryObj<FormFieldComponent>;
type HasErrorStory = StoryObj<FormFieldComponent & { hasError: boolean }>;

export const Default: HasErrorStory = {
  args: {
    label: 'Input with label and message',
    message: 'This is additional info that will be shown below the input',
    hasError: false,
  },
  argTypes: {
    hasError: {
      control: 'boolean',
      description: 'Sets error state on the input element',
    },
  },
  render: (args) => ({
    props: args,
    template: `<kirby-form-field label="${args.label}" message="${args.message}">
    <input kirby-input [hasError]="hasError"/>
  </kirby-form-field>`,
  }),
};

export const Textarea: Story = {
  render: () => ({
    template: `<kirby-form-field label="Textarea with label and message" message="This is additional info that will be shown below the textarea">
    <textarea kirby-textarea></textarea>
  </kirby-form-field>`,
  }),
};

export const InputCounter: Story = {
  render: () => ({
    template: `<kirby-form-field>
    <input kirby-input placeholder="Input Counter" #input maxlength="140" />
    <kirby-input-counter [listenTo]="input"></kirby-input-counter>
  </kirby-form-field>`,
  }),
};

export const InputWithFormControlInputCounter: Story = {
  decorators: [
    moduleMetadata({
      imports: [ReactiveFormsModule],
    }),
  ],
  render: () => ({
    props: {
      textControl: new FormControl('Prefilled Input Value'),
    },
    template: `<kirby-form-field label="Form Control Input with Input Counter" >
    <input kirby-input [formControl]="textControl" #input />
    <kirby-input-counter [listenTo]="input"></kirby-input-counter>
  </kirby-form-field>`,
  }),
};

export const TextareaWithFormControlInputCounter: Story = {
  decorators: [
    moduleMetadata({
      imports: [ReactiveFormsModule],
    }),
  ],
  render: () => ({
    props: {
      textControl: new FormControl('Prefilled Textarea Value'),
    },
    template: `<kirby-form-field label="Form Control Textarea with Input Counter" >
    <textarea kirby-textarea [formControl]="textControl" #textarea></textarea>
    <kirby-input-counter [listenTo]="textarea"></kirby-input-counter>
  </kirby-form-field>`,
  }),
};

export const CookbookExample: Story = {
  render: () => ({
    template: `<cookbook-form-field-example></cookbook-form-field-example>`,
  }),
};

export const DateInputWithPrefixIcon: Story = {
  render: () => ({
    template: `
      <kirby-form-field label="Date input with prefix icon">
        <kirby-icon kirby-affix="prefix" name="calendar"></kirby-icon>
        <input kirby-input type="date" size="size" />
      </kirby-form-field>
    `,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const input = canvas.getByRole('textbox');

    await userEvent.click(input);
    await userEvent.type(input, '987654');
  },
};

export const InputWithNativeDatePicker: Story = {
  decorators: [
    moduleMetadata({
      imports: [ReactiveFormsModule, InputComponent, FormFieldComponent, CardComponent],
    }),
  ],
  render: () => ({
    template: `<kirby-form-field>
      <input kirby-input type="date" [useNativeDatePicker]="true" />
    </kirby-form-field>
    <kirby-card [hasPadding]="true">
      <kirby-form-field style="margin-bottom: 0">
        <input kirby-input type="date" [useNativeDatePicker]="true" />
      </kirby-form-field>
    </kirby-card>
    `,
  }),
};

export const InputFocused: Story = {
  render: () => ({
    template: `
      <kirby-form-field label="Focused input">
        <input kirby-input placeholder="Type here..." />
      </kirby-form-field>
    `,
    styles: [':host { padding: 8px; }'],
  }),
  play: async ({ canvasElement }) => {
    const input = canvasElement.querySelector('input');
    if (input) {
      input.focus();
    }
  },
};

const formFieldVariants: {
  id: string;
  label: string;
  element: 'input' | 'textarea';
  value?: string;
  hasError?: boolean;
  affix?: boolean;
  borderless?: boolean;
}[] = [
  { id: 'placeholder', label: 'Placeholder', element: 'input' },
  { id: 'value', label: 'Value', element: 'input', value: 'Value' },
  { id: 'affix', label: 'Affix', element: 'input', value: '1.000', affix: true },
  // Error is a variant rather than a state, so it's shown in every interaction state.
  // This guards the rule order that keeps the error border over hover and active,
  // and the focus ring over the error.
  { id: 'error', label: 'Error', element: 'input', value: 'Value', hasError: true },
  { id: 'borderless', label: 'Borderless', element: 'input', value: 'Value', borderless: true },
  { id: 'textarea', label: 'Textarea', element: 'textarea', value: 'Value' },
];

// Disabled inputs can't be interacted with, so disabled is shown as a state of its own
const formFieldStates = [...interactionStates, 'disabled'] as const;

export const InteractionStates: Story = {
  parameters: {
    pseudo: pseudoStatesFor(
      idsOnSurfaces(
        'form-field',
        formFieldVariants.map((variant) => variant.id)
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
          <kirby-form-field [label]="state" style="width: 180px">
            @if (variant.affix) {
              <span kirby-affix="suffix">kr.</span>
            }
            @if (variant.element === 'textarea') {
              <textarea
                kirby-textarea
                [attr.id]="'form-field-' + surface + '-' + variant.id + '-' + state"
                [value]="variant.value"
                [disabled]="state === 'disabled'"
              ></textarea>
            } @else {
              <input
                kirby-input
                [attr.id]="'form-field-' + surface + '-' + variant.id + '-' + state"
                placeholder="Placeholder"
                [value]="variant.value ?? ''"
                [hasError]="variant.hasError"
                [borderless]="variant.borderless"
                [disabled]="state === 'disabled'"
              />
            }
          </kirby-form-field>
        }
      </div>
    }
  `,
    'max-content',
    { variants: formFieldVariants, states: formFieldStates },
    { stacked: true }
  ),
};
