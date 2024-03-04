import { argsToTemplate, type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';

import { FormFieldComponent } from './form-field.component';
import { FormFieldModule } from './form-field.module';
import { InputComponent, TextareaComponent } from './public_api';

const meta: Meta<FormFieldComponent> = {
  component: FormFieldComponent,
  title: 'FormFieldComponent',
  decorators: [
    moduleMetadata({
      imports: [FormFieldModule, InputComponent, TextareaComponent],
    }),
  ],
};
export default meta;
type Story = StoryObj<FormFieldComponent>;

export const Default: Story = {
  args: {
    label: 'Input with label and message',
    message: 'This is additional info that will be shown below the input',
  },
  render: (args: FormFieldComponent) => ({
    props: args,
    template: `<kirby-form-field ${argsToTemplate(args)}>
    <input kirby-input />
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
