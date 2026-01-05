import { argsToTemplate, type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';
import {
  DecimalMaskDirective,
  FormFieldComponent,
  InputComponent,
  InputSize,
} from '@kirbydesign/designsystem/form-field';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

type InputProps = InputComponent & { placeholder?: string };

const meta: Meta<InputComponent> = {
  component: InputComponent,
  title: 'Components / FormField / Standalone /Input',
  argTypes: {
    maxlength: {
      control: {
        type: 'number',
      },
    },
  },
};
export default meta;
type Story = StoryObj<InputProps>;

export const Input: Story = {
  args: {
    type: '',
    size: InputSize.large,
    borderless: false,
    hasError: false,
    autocomplete: 'off',
    autocorrect: 'off',
    value: '',
    inputmode: '',
    placeholder: '',
  },
  render: (args) => ({
    props: args,
    template: `<input kirby-input ${argsToTemplate(args)} />`,
  }),
};

export const InputWithDecimalMaskAndPrecision: Story = {
  decorators: [
    moduleMetadata({
      imports: [ReactiveFormsModule, DecimalMaskDirective, FormFieldComponent],
    }),
  ],
  render: () => ({
    props: {
      numberControl: new FormControl(1.2345),
    },
    template: `<kirby-form-field label="Decimal Mask with padded default precision">
  <input kirby-input kirby-decimal-mask [formControl]="numberControl" />
</kirby-form-field>
<kirby-form-field label="Decimal Mask with padded precision of 4">
    <input kirby-input precision="4" kirby-decimal-mask [formControl]="numberControl" />
</kirby-form-field>`,
  }),
};
