import { argsToTemplate, type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';

import {
  FormFieldComponent,
  FormFieldModule,
  InputComponent,
  TextareaComponent,
} from '@kirbydesign/designsystem/form-field';

import { FormFieldExampleComponent } from '~/app/examples/form-field-example/form-field-example.component';

const meta: Meta<FormFieldComponent> = {
  component: FormFieldComponent,
  title: 'Components / FormField',
  decorators: [
    moduleMetadata({
      imports: [FormFieldModule, InputComponent, TextareaComponent, FormFieldExampleComponent],
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
  render: (args) => ({
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

export const CookbookExample: Story = {
  render: () => ({
    template: `<cookbook-form-field-example></cookbook-form-field-example>`,
  }),
};
